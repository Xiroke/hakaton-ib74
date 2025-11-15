from sqlalchemy.orm import Session

from app.models import Scan


def create_scan(db: Session, target: str) -> Scan:
    scan = Scan(target=target)
    db.add(scan)
    db.commit()
    db.refresh(scan)
    return scan


def update_scan_status(db: Session, scan_id: int, status: str):
    scan = db.query(Scan).filter(Scan.id == scan_id).first()
    if scan:
        scan.status = status
        db.commit()


def append_scan_output(db: Session, scan_id: int, output: str):
    scan = db.query(Scan).filter(Scan.id == scan_id).first()
    if scan:
        scan.nmap_output += output
        db.commit()


def append_nuclei_output(db: Session, scan_id: int, output: str):
    scan = db.query(Scan).filter(Scan.id == scan_id).first()
    if scan:
        scan.nuclei_output += output
        db.commit()


# ✅ Новая функция для лога эксплуатации
def append_exploit_log(db: Session, scan_id: int, log_entry: str):
    scan = db.query(Scan).filter(Scan.id == scan_id).first()
    if scan:
        scan.exploit_log += log_entry + "\n"
        db.commit()


# ✅ Новая функция для сохранения отчета
def save_report(db: Session, scan_id: int, report_text: str):
    scan = db.query(Scan).filter(Scan.id == scan_id).first()
    if scan:
        scan.report_content = report_text
        db.commit()
