from fastcrud import FastCRUD
from sqlalchemy.ext.asyncio import AsyncSession

from src.app.models import Scan

scan_crud = FastCRUD(Scan)


# -------------------------------------------------------------
# Создание
# -------------------------------------------------------------
async def create_scan(db: AsyncSession, target: str) -> Scan:
    obj = await scan_crud.create(db=db, object={"target": target})
    await db.commit()
    return obj


# -------------------------------------------------------------
# Статус
# -------------------------------------------------------------
async def update_scan_status(db: AsyncSession, scan_id: str, status: str):
    await scan_crud.update(db=db, id=scan_id, object={"status": status})
    await db.commit()


# -------------------------------------------------------------
# Логи NMAP
# -------------------------------------------------------------
async def append_scan_output(db: AsyncSession, scan_id: str, output: str):
    scan = await scan_crud.get(db=db, id=scan_id)

    new_value = (scan.nmap_output or "") + output

    await scan_crud.update(db=db, id=scan_id, object={"nmap_output": new_value})
    await db.commit()


# -------------------------------------------------------------
# Логи Nuclei
# -------------------------------------------------------------
async def append_nuclei_output(db: AsyncSession, scan_id: str, output: str):
    scan = await scan_crud.get(db=db, id=scan_id)

    new_value = (scan.nuclei_output or "") + output

    await scan_crud.update(db=db, id=scan_id, object={"nuclei_output": new_value})
    await db.commit()


# -------------------------------------------------------------
# Логи exploitation
# -------------------------------------------------------------
async def append_exploit_log(db: AsyncSession, scan_id: str, log_entry: str):
    scan = await scan_crud.get(db=db, id=scan_id)

    new_value = (scan.exploit_log or "") + log_entry + "\n"

    await scan_crud.update(db=db, id=scan_id, object={"exploit_log": new_value})
    await db.commit()


# -------------------------------------------------------------
# Отчёт
# -------------------------------------------------------------
async def save_report(db: AsyncSession, scan_id: str, report_text: str):
    await scan_crud.update(db=db, id=scan_id, object={"report_content": report_text})
    await db.commit()
