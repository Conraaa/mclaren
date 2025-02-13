from django.contrib import admin
from .models import Usuario, Departamento, Pista , Estrategia , Ticket , Pieza,  Categoria

admin.site.register(Pista)
admin.site.register(Departamento)
admin.site.register(Usuario)
admin.site.register(Estrategia)
admin.site.register(Ticket)
admin.site.register(Pieza)
admin.site.register(Categoria)