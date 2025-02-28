from django.contrib import admin
from .models import Usuario, Departamento, Pista, Estrategia, Pieza,  Categoria, Telemetria, Registro, Carrera, EstrategiaPieza

admin.site.register(Pista)
admin.site.register(Departamento)
admin.site.register(Usuario)
admin.site.register(Estrategia)
admin.site.register(Pieza)
admin.site.register(Categoria)
admin.site.register(Telemetria)
admin.site.register(Registro)
admin.site.register(Carrera)
admin.site.register(EstrategiaPieza)