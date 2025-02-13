from django.db import models
from .utils import format_char_field
from django.utils.deconstruct import deconstructible
from django.contrib.auth.hashers import make_password, check_password

class BaseModel(models.Model):                  #Modelo Base
    def save(self, *args, **kwargs):
        for field in self._meta.fields:         #Itero sobre los campos que usen este modelo base, y si es un CharField aplico el formateo
            if isinstance(field, models.CharField):
                value = getattr(self, field.name, "")
                setattr(self, field.name, format_char_field(value))
        super().save(*args, **kwargs)

    class Meta:
        abstract = True                         #No creo tabla en BD de este modelo
        
@deconstructible
class ImageUploadTo:
    def __init__(self, folder_name):
        self.folder_name = folder_name
    
    def __call__(self, instance, filename):
        return f'{self.folder_name}/{filename}'

# Create your models here.
class Departamento(BaseModel):
    nombre = models.CharField(max_length=500)

class Usuario(BaseModel):
    dni = models.BigIntegerField(null=True, blank=True)
    nombre = models.CharField(max_length=500, null=True, blank=True)
    apellido = models.CharField(max_length=500, null=True, blank=True)
    legajo = models.BigIntegerField(null=True, blank=True, unique=True)
    departamento = models.ForeignKey(Departamento, on_delete=models.CASCADE, related_name='usuarios')
    contrasenia = models.CharField(max_length=500, null=True, blank=True)

    def set_contrasenia(self, contrasenia):         #Cifra contraseña
        self.contrasenia = make_password(contrasenia)

    def check_contrasenia(self, contrasenia):       #Verifica contraseña en el login con el hash
        return check_password(contrasenia, self.contrasenia)

class Categoria(BaseModel):
    nombre = models.CharField(max_length=500)
    departamento = models.ForeignKey(Departamento, on_delete=models.CASCADE, related_name='categorias')

    def to_dict(self):
        return {
            "id": self.id,
            "nombre": self.nombre,
            "departamento_id": self.departamento.id
        }

class Pieza(BaseModel):
    nombre = models.CharField(max_length=500)
    categoria = models.ForeignKey(Categoria, on_delete=models.CASCADE, related_name='piezas')

class Pista(BaseModel):
    nombre = models.CharField(max_length=500)
    kilometros = models.DecimalField(max_digits=5, decimal_places=1)
    pais = models.CharField(max_length=500)
    ciudad = models.CharField(max_length=500)
    imagen = models.ImageField(upload_to=ImageUploadTo('pistas'))

class Estrategia(BaseModel):
    LLUVIA = 'Lluvia'
    VIENTO = 'Viento'
    SECO = 'Seco'
    
    ESTRATEGIAS = [
        (LLUVIA, 'Lluvia'),
        (VIENTO, 'Viento'),
        (SECO, 'Seco'),
    ]
    
    nombre = models.CharField(max_length=500, choices=ESTRATEGIAS)
    pista = models.ForeignKey(Pista, on_delete=models.CASCADE, related_name='estrategias')

class EstrategiaPieza(BaseModel):
    estrategia = models.ForeignKey(Estrategia, on_delete=models.CASCADE, related_name='estrategia_piezas')
    pieza = models.ForeignKey(Pieza, on_delete=models.CASCADE, related_name='estrategia_piezas')

class Carrera(BaseModel):
    anio = models.IntegerField()
    cantVueltas = models.IntegerField()
    imagen = models.ImageField(upload_to=ImageUploadTo('carreras'))
    pista = models.ForeignKey(Pista, on_delete=models.CASCADE, related_name='carreras')
    estrategia = models.ForeignKey(Estrategia, on_delete=models.CASCADE, related_name='carreras')

class Telemetria(BaseModel):
    carrera = models.ForeignKey(Carrera, on_delete=models.CASCADE, related_name='telemetrias')

class Registro(BaseModel):
    valor = models.CharField(max_length=500)
    numVuelta = models.IntegerField()
    telemetria = models.ForeignKey(Telemetria, on_delete=models.CASCADE, related_name='registros')