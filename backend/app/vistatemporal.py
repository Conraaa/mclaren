from rest_framework.response import Response
from rest_framework.decorators import api_view
from app.models import Pista
import cloudinary

@api_view(['DELETE'])
def eliminar_pista(request, id):
    try:
        pista = Pista.objects.get(id=id)
        
        if pista.imagen:  # Asegúrate de que el campo se llame exactamente como está en tu modelo
            public_id = pista.imagen.public_id  # Obtener el ID público de la imagen
            cloudinary.uploader.destroy(public_id)  # Borrar imagen de Cloudinary

        pista.delete()  # Ahora sí eliminar la pista de la base de datos

        return Response({"message": "Pista eliminada correctamente"}, status=200)
    except Pista.DoesNotExist:
        return Response({"error": "Pista no encontrada"}, status=404)
    except Exception as e:
        return Response({"error": str(e)}, status=500)


@api_view(['GET'])
def listar_pistas(request):
    from app.models import Pista
    pistas = Pista.objects.all().values("id", "nombre")
    return Response({"pistas": list(pistas)}, status=200)