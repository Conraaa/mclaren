from django.contrib import admin
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.admin import UserAdmin
from django import forms
from .models import Usuario, Departamento, Pista, Estrategia, Pieza,  Categoria, Telemetria, Registro, Carrera, EstrategiaPieza

class CustomUserCreationForm(UserCreationForm):
    class Meta:
        model = Usuario
        fields = ('legajo', 'nombre', 'apellido', 'contrasenia')

    def clean_legajo(self):
        legajo = self.cleaned_data.get('legajo')
        if Usuario.objects.filter(legajo=legajo).exists():
            raise forms.ValidationError("Este legajo ya está registrado.")
        return legajo
    
class CustomUserAdmin(UserAdmin):
    add_form = CustomUserCreationForm
    model = Usuario
    list_display = ['legajo', 'nombre', 'apellido']

admin.site.register(Pista)
admin.site.register(Departamento)
admin.site.register(Usuario, CustomUserAdmin)
admin.site.register(Estrategia)
admin.site.register(Pieza)
admin.site.register(Categoria)
admin.site.register(Telemetria)
admin.site.register(Registro)
admin.site.register(Carrera)
admin.site.register(EstrategiaPieza)