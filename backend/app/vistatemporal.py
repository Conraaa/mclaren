from rest_framework.response import Response
from rest_framework.decorators import api_view
from app.models import Pista
import cloudinary

import cloudinary.uploader
from rest_framework.response import Response
from rest_framework.decorators import api_view
from app.models import Pista

@api_view(['DELETE'])
def eliminar_pista(request, id):
    try:
        pista = Pista.objects.get(id=id)

        # Verifica el contenido de pista.imagen
        print(f"Contenido de pista.imagen: {pista.imagen}")

        if pista.imagen:
            print(f"Tiene imegen")
            if hasattr(pista.imagen, 'public_id'):
                public_id = pista.imagen.public_id
            else:
                # Si no tiene public_id, intenta obtenerlo de la URL
                public_id = pista.imagen.name.split("/")[-1].split(".")[0]
                
            # Elimina la imagen de Cloudinary
            cloudinary.uploader.destroy(public_id)

        # Elimina la pista de la base de datos
        pista.delete()
        print(f"Paso el delete")
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