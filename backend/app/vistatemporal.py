from rest_framework.response import Response
from rest_framework.decorators import api_view
from app.models import Pista

@api_view(['DELETE'])
def eliminar_pista(request, id):
    try:
        pista = Pista.objects.get(id=id)
        pista.delete()
        return Response({"message": "Pista eliminada correctamente"}, status=200)
    except Pista.DoesNotExist:
        return Response({"error": "Pista no encontrada"}, status=404)

@api_view(['GET'])
def listar_pistas(request):
    from app.models import Pista
    pistas = Pista.objects.all().values("id", "nombre")
    return Response({"pistas": list(pistas)}, status=200)