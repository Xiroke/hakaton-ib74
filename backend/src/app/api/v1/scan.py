from fastapi import APIRouter
from fastcrud import FastCRUD

from src.app.models import Scan

router = APIRouter()
scan_crud = FastCRUD(Scan)


# # -----------------------------------------------------------------------------
# # Создать задачу
# # -----------------------------------------------------------------------------
# @router.post("/scan", response_model=ScanRead)
# async def create_scan(
#     scan: ScanCreate,
#     db: AsyncSession = Depends(async_get_db),
#     user=Depends(get_current_user),
# ):
#     task_id = str(uuid4())

#     task = await scan_crud.create(
#         db=db,
#         object=ScanCreateInternal(
#             id=task_id,
#             title=scan.title,
#             host=scan.host,
#             port=scan.port,
#             status="pending",
#             output="",
#             user_id=user["id"],
#         ),
#     )
#     await db.commit()

#     # Запускаем асинхронный воркер
#     asyncio.create_task(run_full_scan(task_id, scan.host, scan.port))

#     return task


# # -----------------------------------------------------------------------------
# # Мои задачи
# # -----------------------------------------------------------------------------
# @router.get("/scan/my", response_model=list[ScanRead])
# async def get_my_scans(user=Depends(get_current_user), db: AsyncSession = Depends(async_get_db)):
#     result = await crud_scans.get_multi(db=db, user_id=user["id"], schema_to_select=ScanRead)
#     return result["data"]


# # -----------------------------------------------------------------------------
# # Получить одну задачу
# # -----------------------------------------------------------------------------
# @router.get("/scan/{task_id}", response_model=ScanRead)
# async def read_scan(task_id: str, db: AsyncSession = Depends(async_get_db)):
#     task = await scan_crud.get(db=db, id=task_id)
#     if not task:
#         raise HTTPException(status_code=404, detail="Scan not found")
#     return task


# # -----------------------------------------------------------------------------
# # Удалить
# # -----------------------------------------------------------------------------
# @router.delete("/scan/{task_id}")
# async def delete_scan(task_id: str, db: AsyncSession = Depends(async_get_db)):
#     task = await scan_crud.get(db=db, id=task_id)
#     if not task:
#         raise HTTPException(status_code=404, detail="Scan not found")

#     await scan_crud.delete(db=db, id=task_id)
#     await db.commit()

#     return {"status": "deleted"}
