from django.db.models.signals import post_delete
from django.dispatch import receiver
from .models import Pista, Carrera

@receiver(post_delete, sender=Pista)
def eliminar_imagen_pista(sender, instance, **kwargs):
    if instance.imagen:
        instance.imagen.delete(False)

@receiver(post_delete, sender=Carrera)
def eliminar_imagen_carrera(sender, instance, **kwargs):
    if instance.imagen:
        instance.imagen.delete(False)