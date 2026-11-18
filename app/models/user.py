from sqlalchemy import ForeignKey, String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.database import Base


class User(Base):
    __tablename__ = "Users"

    id: Mapped[int] = mapped_column("UserID", primary_key=True, autoincrement=True)
    first_name: Mapped[str] = mapped_column("Fname", String(45))
    last_name: Mapped[str] = mapped_column("Lname", String(45))
    email: Mapped[str] = mapped_column("Email", String(255), unique=True)
    password_hash: Mapped[str] = mapped_column("PswrdHash", String(60))

    role_rows: Mapped[list["UserRole"]] = relationship(
        back_populates="user", cascade="all, delete-orphan", lazy="selectin"
    )

    @property
    def role(self) -> str:
        return self.role_rows[0].role if self.role_rows else "donor"


class UserRole(Base):
    __tablename__ = "Roles"

    user_id: Mapped[int] = mapped_column(
        "UserID", ForeignKey("Users.UserID", ondelete="CASCADE"), primary_key=True
    )
    role: Mapped[str] = mapped_column("Role", String(45), primary_key=True)

    user: Mapped["User"] = relationship(back_populates="role_rows")