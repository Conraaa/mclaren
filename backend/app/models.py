from django.db import models
from django.core.exceptions import ValidationError
import re

# Create your models here.
class Departamento(models.Model):
    nombre = models.CharField(max_length=500)

class Usuario(models.Model):
    dni = models.BigIntegerField(null=True, blank=True)
    nombre = models.CharField(max_length=500, null=True, blank=True)
    apellido = models.CharField(max_length=500, null=True, blank=True)
    legajo = models.BigIntegerField(null=True, blank=True)
    contrasenia = models.CharField(max_length=500, null=True, blank=True)
    departamento = models.ForeignKey(Departamento, on_delete=models.CASCADE, related_name='usuarios')

class Ticket(models.Model):
    usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE, related_name='tickets')

class Categoria(models.Model):
    nombre = models.CharField(max_length=500)
    departamento = models.ForeignKey(Departamento, on_delete=models.CASCADE, related_name='categorias')

    def to_dict(self):
        return {
            "id": self.id,
            "nombre": self.nombre,
            "departamento_id": self.departamento.id
        }

class Pieza(models.Model):
    nombre = models.CharField(max_length=500)
    categoria = models.ForeignKey(Categoria, on_delete=models.CASCADE, related_name='piezas')

class Pista(models.Model):
    nombre = models.CharField(max_length=500)
    kilometros = models.DecimalField(max_digits=5, decimal_places=1)
    pais = models.CharField(max_length=500)
    ciudad = models.CharField(max_length=500)
    imagen = models.ImageField(upload_to='imagenes/')
    
    def clean(self):
        if any(re.search(r'\d', field) for field in [self.nombre, self.pais, self.ciudad]):
            raise ValidationError("Los campos de texto no deben contener números.")
    
    def save(self, *args, **kwargs):
        self.full_clean()
        super().save(*args, **kwargs)

class Estrategia(models.Model):
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

class EstrategiaPieza(models.Model):
    estrategia = models.ForeignKey(Estrategia, on_delete=models.CASCADE, related_name='estrategia_piezas')
    pieza = models.ForeignKey(Pieza, on_delete=models.CASCADE, related_name='estrategia_piezas')

class Carrera(models.Model):
    anio = models.IntegerField()
    cantVueltas = models.IntegerField()
    imagen = models.ImageField(upload_to='imagenes/')
    pista = models.ForeignKey(Pista, on_delete=models.CASCADE, related_name='carreras')
    estrategia = models.ForeignKey(Estrategia, on_delete=models.CASCADE, related_name='carreras')

class Telemetria(models.Model):
    carrera = models.ForeignKey(Carrera, on_delete=models.CASCADE, related_name='telemetrias')

class Registro(models.Model):
    valor = models.CharField(max_length=500)
    numVuelta = models.IntegerField()
    telemetria = models.ForeignKey(Telemetria, on_delete=models.CASCADE, related_name='registros')