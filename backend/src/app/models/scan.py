from datetime import UTC, datetime

from sqlalchemy import DateTime, ForeignKey, String, Text
from sqlalchemy.orm import Mapped, mapped_column

from ..core.db.database import Base


class Scan(Base):
    __tablename__ = "scan"

    id: Mapped[str] = mapped_column(primary_key=True)
    title: Mapped[str] = mapped_column(String(100))
    target: Mapped[str] = mapped_column(String, index=True)

    user_id: Mapped[int] = mapped_column(ForeignKey("user.id"))

    nmap_output: Mapped[str] = mapped_column(Text, default="")
    nuclei_output: Mapped[str] = mapped_column(Text, default="")

    exploit_log: Mapped[str] = mapped_column(Text, default="")  # Лог поиска и попыток эксплуатации
    report_content: Mapped[str] = mapped_column(Text, default="")  # Финальный текстовый отчет

    status: Mapped[str] = mapped_column(String(100), default="queued")  # queued -> running -> finished -> failed
    output: Mapped[str] = mapped_column(Text, nullable=True, default="")

    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default_factory=lambda: datetime.now(UTC))
