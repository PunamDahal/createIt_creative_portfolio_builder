from sqlalchemy import Column, Integer, String, TIMESTAMP
from database import Base
import datetime

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, nullable=False)
    name = Column(String, nullable=True)
    avatar_url = Column(String, nullable=True)
    provider = Column(String, nullable=False)
    provider_id = Column(String, unique=True, nullable=False)
    created_at = Column(TIMESTAMP, default=datetime.datetime.utcnow)

def get_user_by_provider_id(db, provider, provider_id):
    return db.query(User).filter(User.provider == provider, User.provider_id == provider_id).first()
