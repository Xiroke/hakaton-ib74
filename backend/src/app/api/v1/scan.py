from arq.jobs import Job
from fastapi import APIRouter, HTTPException

from src.app.core.utils import queue

router = APIRouter(tags=["scan"])


@router.get("/scan")
async def scan():
    job = await queue.pool.enqueue_job(
        "scan_task",
    )

    return {"job_id": job.job_id}


@router.get("/scan/{job_id}/status")
async def scan_status(job_id: str):
    job = Job(job_id, queue.pool)
    status = await job.status()  # статус:queued, in_progress, complete
    return {"job_id": job_id, "status": status.value}


@router.get("/scan/{job_id}/result")
async def scan_result(job_id: str):
    job = Job(job_id, queue.pool)

    status = await job.status()
    if status != "complete":
        raise HTTPException(status_code=400, detail="Результат ещё не готов")

    try:
        result = await job.result(timeout=0)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Ошибка получения результата: {e}")

    return {"job_id": job_id, "result": result}
