from django.http import JsonResponse
from django.views import View
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
import json
import requests

def getEmpleados(request):
    if request.method == "GET":
        empleados = [
            {"idtrabajador": "1", "nombre": "Juan", "apellido": "Perez", "idprofesion": "2", "estadotrabajo": "Disponible"},
            {"idtrabajador": "2", "nombre": "Jorge", "apellido": "Alvarez", "idprofesion": "3", "estadotrabajo": "Disponible"},
            {"idtrabajador": "3", "nombre": "Carlos Andrés", "apellido": "Gutiérrez Márquez", "idprofesion": "1", "estadotrabajo": "Disponible"},
            {"idtrabajador": "4", "nombre": "Mariana Sofía", "apellido": "Herrera", "idprofesion": "4", "estadotrabajo": "Disponible"},
            {"idtrabajador": "5", "nombre": "Fernando", "apellido": "Castillo", "idprofesion": "2", "estadotrabajo": "Disponible"},
            {"idtrabajador": "6", "nombre": "Andrea Valentina", "apellido": "Torres", "idprofesion": "6", "estadotrabajo": "Disponible"},
            {"idtrabajador": "7", "nombre": "Camila", "apellido": "Molina", "idprofesion": "5", "estadotrabajo": "Disponible"},
            {"idtrabajador": "8", "nombre": "Emmanuel", "apellido": "Rojas", "idprofesion": "3", "estadotrabajo": "Disponible"},
            {"idtrabajador": "9", "nombre": "Carla", "apellido": "Mendoza", "idprofesion": "4", "estadotrabajo": "Disponible"},
            {"idtrabajador": "10", "nombre": "Elena", "apellido": "Ruiz", "idprofesion": "6", "estadotrabajo": "Disponible"},
        ]
        return JsonResponse({"empleados": empleados}, safe=False)
    
def getProfesiones(request):
    if request.method == "GET":
        profesiones = [
            {"idprofesion": "1","nombre": "Científico de materiales"},
            {"idprofesion": "2","nombre": "Mecánico"},
            {"idprofesion": "3","nombre": "Aerodinamista"},
            {"idprofesion": "4","nombre": "Estratega de carrera"},
            {"idprofesion": "5","nombre": "Telemetrista"},
            {"idprofesion": "6","nombre": "Técnico en sistemas de transmisión"},
        ]
        return JsonResponse({"profesiones": profesiones}, safe=False)
    
@method_decorator(csrf_exempt, name='dispatch')
class patchEmpleado(View):
    def patch(self, request, idtrabajador, *args, **kwargs):
        try:
            data = json.loads(request.body)
            nuevo_estado = data.get("estado")

            if not nuevo_estado:
                return JsonResponse({"error": "El campo 'estado' es obligatorio."}, status=400)

            response = requests.get("http://127.0.0.1:8000/jellyjobs/empleados/")

            if response.status_code != 200:
                return JsonResponse({"error": "No se pudo obtener la lista de empleados."}, status=500)

            empleados = response.json().get("empleados", [])

            trabajador = next((t for t in empleados if int(t["idtrabajador"]) == idtrabajador), None)

            if not trabajador:
                return JsonResponse({"error": "Trabajador no encontrado."}, status=404)

            trabajador["estadotrabajo"] = nuevo_estado
            return JsonResponse(trabajador, status=200)

        except json.JSONDecodeError:
            return JsonResponse({"error": "Formato JSON inválido."}, status=400)