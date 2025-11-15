from fastcrud import FastCRUD

from ..models.scan import Scan

crud_scan = FastCRUD(Scan)

__all__ = ["crud_scan"]
