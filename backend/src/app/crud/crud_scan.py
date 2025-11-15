from fastcrud import FastCRUD

from ..models.scan import Scan

crud_scans = FastCRUD(Scan)

__all__ = ["crud_scans"]
