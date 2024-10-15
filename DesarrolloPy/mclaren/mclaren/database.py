import sqlalchemy as sa
from sqlalchemy.orm import sessionmaker

# Define la URL de conexión a tu base de datos
DATABASE_URL = "mssql+pyodbc://@localhost/mclaren?driver=ODBC+Driver+17+for+SQL+Server&trusted_connection=yes"

# Crear un motor de base de datos
engine = sa.create_engine(DATABASE_URL)

# Crear una sesión
Session = sessionmaker(bind=engine)

def get_session():
    return Session()


""""
from sqlalchemy import create_engine, Column, Integer, String, Sequence
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# Define la URL de la base de datos para SQL Server
DATABASE_URL = "mssql+pyodbc://username:password@server_name/database_name?driver=ODBC+Driver+17+for+SQL+Server"

# Crear el motor de la base de datos
engine = create_engine(DATABASE_URL, echo=True)

# Crea una base de clase
Base = declarative_base()

# Define una tabla de ejemplo
class User(Base):
    __tablename__ = 'users'
    id = Column(Integer, Sequence('user_id_seq'), primary_key=True)
    name = Column(String(50))
    fullname = Column(String(50))
    nickname = Column(String(50))

# Crear todas las tablas en la base de datos
Base.metadata.create_all(bind=engine)

# Crear una sesión para interactuar con la base de datos
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
"""