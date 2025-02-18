from django.contrib.auth.hashers import check_password
from .models import Usuario  # Adjust the import path as necessary

usuario = Usuario.objects.get(legajo=1548554)
hash_bd = usuario.contrasenia

print(f"La contraseña es correcta? {check_password('default', hash_bd)}")  