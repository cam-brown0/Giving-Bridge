from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import select
from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.user import User
from app.schemas.user import LoginRequest, TokenOut, UserCreate, UserOut
from app.services.security import create_access_token, hash_password, verify_password

router = APIRouter(prefix="/auth", tags=["auth"])

# Used so that logging in with an unknown email takes as long as a wrong password.
DUMMY_HASH = hash_password("not-a-real-password")


@router.post("/register", response_model=UserOut, status_code=201)
def register(payload: UserCreate, db: Session = Depends(get_db)):
    email = payload.email.lower()

    if db.scalar(select(User).where(User.email == email)):
        raise HTTPException(status_code=409, detail="That email is already registered")

    user = User(
        email=email,
        password_hash=hash_password(payload.password),
        full_name=payload.full_name.strip(),
        role=payload.role,
    )
    db.add(user)
    try:
        db.commit()
    except IntegrityError:  # two signups with the same email at the same instant
        db.rollback()
        raise HTTPException(status_code=409, detail="That email is already registered")
    db.refresh(user)
    return user


@router.post("/login", response_model=TokenOut)
def login(payload: LoginRequest, db: Session = Depends(get_db)):
    user = db.scalar(select(User).where(User.email == payload.email.lower()))

    # Check a hash either way so response time doesn't reveal whether the email exists.
    password_ok = verify_password(payload.password, user.password_hash if user else DUMMY_HASH)

    if user is None or not password_ok:
        raise HTTPException(status_code=401, detail="Incorrect email or password")

    return TokenOut(access_token=create_access_token(user.id), user=user)