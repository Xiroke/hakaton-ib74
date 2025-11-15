import asyncio

from src.app.core.db.database import async_session_factory
from src.app.crud.crud_scan import crud_scans
from src.app.models import Scan

from .exploitation import run_exploit_phase
from .reporting import ReportGenerator

NMAP_PATH = "nmap"
NUCLEI_PATH = "nuclei"


# --------------------------------------------------------------------
# Обновление логов
# --------------------------------------------------------------------
async def append_output(scan_id: str, prefix: str, text: str):
    async with async_session_factory() as db:
        scan = await crud_scans.get(db=db, id=scan_id)
        if scan:
            scan.output = (scan.output or "") + f"[{prefix}] {text}"
            await db.commit()


async def set_status(scan_id: str, status: str):
    async with async_session_factory() as db:
        await crud_scans.update(db=db, id=scan_id, object={"status": status})
        await db.commit()


# --------------------------------------------------------------------
# Асинхронный запуск shell-команд
# --------------------------------------------------------------------
async def run_command(scan_id: str, prefix: str, cmd: list):
    try:
        process = await asyncio.create_subprocess_exec(
            *cmd,
            stdout=asyncio.subprocess.PIPE,
            stderr=asyncio.subprocess.STDOUT,
        )

        while True:
            line = await process.stdout.readline()
            if not line:
                break
            decoded = line.decode(errors="replace")
            await append_output(scan_id, prefix, decoded)

        await process.wait()

        if process.returncode != 0:
            await set_status(scan_id, "failed")

    except Exception as e:
        await append_output(scan_id, prefix, f"ERROR: {e}\n")
        await set_status(scan_id, "failed")


# --------------------------------------------------------------------
# Основной воркер
# --------------------------------------------------------------------
async def run_full_scan(scan_id: str, host: str, port: int):
    await set_status(scan_id, "running-nmap")

    # -----------------------------------
    # NMAP
    # -----------------------------------
    await run_command(
        scan_id,
        "nmap",
        [NMAP_PATH, "-sV", "-sC", "-p", str(port), host],
    )

    # -----------------------------------
    # NUCLEI
    # -----------------------------------
    await set_status(scan_id, "running-nuclei")
    await run_command(
        scan_id,
        "nuclei",
        [NUCLEI_PATH, "-u", host, "-tags", "cve", "-fr", "-duc", "-j"],
    )

    # -----------------------------------
    # EXPLOITATION
    # -----------------------------------
    await set_status(scan_id, "running-exploitation")
    await run_exploit_phase(scan_id)

    # -----------------------------------
    # ОТЧЕТ
    # -----------------------------------
    await set_status(scan_id, "running-reporting")

    async with async_session_factory() as db:
        scan: Scan | None = await crud_scans.get(db=db, id=scan_id)
        generator = ReportGenerator(scan)
        report = generator.generate()

        await crud_scans.update(db=db, id=scan_id, object={"report": report})
        await db.commit()

    # -----------------------------------
    # ГОТОВО
    # -----------------------------------
    await set_status(scan_id, "finished")
