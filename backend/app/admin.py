from django.contrib import admin
from .models import Usuario
# Register your models here.
from .models import Departamento

admin.site.register(Departamento)
admin.site.register(Usuario)

