import sqlalchemy as sa
from sqlalchemy.orm import sessionmaker

DATABASE_URL = "mssql+pyodbc://@localhost/mclaren?driver=ODBC+Driver+17+for+SQL+Server&trusted_connection=yes"

engine = sa.create_engine(DATABASE_URL)

Session = sessionmaker(bind=engine)

def get_session():
    return Session()


""""
from sqlalchemy import create_engine, Column, Integer, String, Sequence
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

DATABASE_URL = "mssql+pyodbc://username:password@server_name/database_name?driver=ODBC+Driver+17+for+SQL+Server"

engine = create_engine(DATABASE_URL, echo=True)

Base = declarative_base()

//table ejemplo
class User(Base):
    __tablename__ = 'users'
    id = Column(Integer, Sequence('user_id_seq'), primary_key=True)
    name = Column(String(50))
    fullname = Column(String(50))
    nickname = Column(String(50))

Base.metadata.create_all(bind=engine)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
"""