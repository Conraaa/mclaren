from django.contrib import admin
from .models import Usuario
# Register your models here.
from .models import Departamento
from .models import Pieza
from .models import Categoria
admin.site.register(Departamento)
admin.site.register(Usuario)
admin.site.register(Pieza)
admin.site.register(Categoria)