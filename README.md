# Requisitos para un correcto funcionamiento del sistema

## FRONTEND - React

+Utilizando Visual Studio Code, agregar la extension de React: "_ES7+ React/Redux/React-Native snippets_".

_C:\...>_ npm install create-react-app

_C:\...>_ npm install react-player

_C:\...>_ npm install react-router-dom

_C:\...>_ npm install react-bootstrap bootstrap

+Una vez instalado todo, "_C:\...>_ npm start" ejecutará la aplicación en el modo de desarrollo.



## BACKEND - Django

+Teniendo Python y el gestor de paquetes PIP instalados, se instalará Django. En caso de no tenerlos se pueden obtener en https://www.python.org/ y https://pypi.org/project/pip/, respectivamente.

_C:\...>_ py -m pip install Django


+Tener la base de datos creda en SSMS con nombre "mclaren".


+Instalar _Version 17_ del controlador ODBC:

https://learn.microsoft.com/en-us/sql/connect/odbc/download-odbc-driver-for-sql-server?view=sql-server-ver16


+Crear y configurar el entorno virtual:

_C:...\mclaren\backend>_ python -m venv venv                  #Crea el entorno virtual

**_Windows:_**
.\venv\Scripts\activate                                 #Activa el entorno virtual

**_Linux:_**
source venv/bin/activate                                #Activa el entorno virtual

-Una vez creado y dentro del entorno virtual, configurar el interprete y descargar paquetes:

En VSCode: F1 > Select Interpreter > Python('venv')

_(venv) C:...\mclaren\backend>_ pip install -r requirements.txt


+Correr el backend:

_(venv) C:...\mclaren\backend>_ python manage.py runserver



## Reglas de Negocio

