from fastapi import APIRouter

from ..api.v1 import router as v1_router
from .pentestAssistant.app.main import app as scan_app

router = APIRouter(prefix="/api")
router.include_router(v1_router)
router.include_router(scan_app, tags=["scan"])
