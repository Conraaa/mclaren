from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, viewsets
from django.contrib.auth.hashers import check_password
from .models import Departamento, Usuario, Ticket, Categoria, Pieza, Pista, Estrategia, EstrategiaPieza, Carrera, Telemetria, Registro
from .serializers import DepartamentoSerializer, UsuarioSerializer, TicketSerializer, CategoriaSerializer, PiezaSerializer, PistaSerializer, EstrategiaSerializer, EstrategiaPiezaSerializer, CarreraSerializer, TelemetriaSerializer, RegistroSerializer, LoginSerializer 
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json

class DepartamentoViewSet(viewsets.ModelViewSet):
    queryset = Departamento.objects.all()
    serializer_class = DepartamentoSerializer

class UsuarioViewSet(viewsets.ModelViewSet):
    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializer
    
class TicketViewSet(viewsets.ModelViewSet):
    queryset = Ticket.objects.all()
    serializer_class = TicketSerializer

class CategoriaViewSet(viewsets.ModelViewSet):
    queryset = Categoria.objects.all()
    serializer_class = CategoriaSerializer

class PiezaViewSet(viewsets.ModelViewSet):
    queryset = Pieza.objects.all()
    serializer_class = PiezaSerializer

class PistaViewSet(viewsets.ModelViewSet):
    queryset = Pista.objects.all()
    serializer_class = PistaSerializer

class EstrategiaViewSet(viewsets.ModelViewSet):
    queryset = Estrategia.objects.all()
    serializer_class = EstrategiaSerializer

class EstrategiaPiezaViewSet(viewsets.ModelViewSet):
    queryset = EstrategiaPieza.objects.all()
    serializer_class = EstrategiaPiezaSerializer

class CarreraViewSet(viewsets.ModelViewSet):
    queryset = Carrera.objects.all()
    serializer_class = CarreraSerializer

class TelemetriaViewSet(viewsets.ModelViewSet):
    queryset = Telemetria.objects.all()
    serializer_class = TelemetriaSerializer

class RegistroViewSet(viewsets.ModelViewSet):
    queryset = Registro.objects.all()
    serializer_class = RegistroSerializer

class LoginView(APIView):
    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            legajo = serializer.validated_data['legajo']
            contrasenia = serializer.validated_data['contrasenia']
            
            # Buscar el usuario por legajo
            try:
                usuario = Usuario.objects.get(legajo=legajo)

                # Depuración: imprime los datos del usuario
                print(f"Usuario: {usuario}")
                print(f"Nombre: {usuario.nombre}")
                print(f"Departamento: {usuario.departamento.nombre}")
                
                # Verificar la contraseña
                if contrasenia == usuario.contrasenia:
                    return Response({
                        "message": "Login exitoso",
                        "access": "fake_access_token",
                        "refresh": "fake_refresh_token",
                        "nombre": usuario.nombre,
                        "departamento": usuario.departamento.nombre,
                        "legajo": usuario.legajo,  # Agregamos el departamento
                    }, status=status.HTTP_200_OK)
                else:
                    return Response({"error": "Contraseña incorrecta"}, status=status.HTTP_401_UNAUTHORIZED)

            except Usuario.DoesNotExist:
                return Response({"error": "Legajo no encontrado"}, status=status.HTTP_404_NOT_FOUND)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@csrf_exempt
def verificar_legajo(request):
    if request.method == "POST":
        try:
            # Parsear el cuerpo del request
            body = json.loads(request.body)
            legajo = body.get("legajo")

            if not legajo:
                return JsonResponse({"status": "error", "message": "El legajo es requerido."}, status=400)

            # Buscar al usuario en la base de datos por legajo
            usuario = Usuario.objects.filter(legajo=legajo).select_related('departamento').first()

            if not usuario:
                return JsonResponse({"status": "error", "message": "Legajo no encontrado."}, status=404)

            # Devolver los datos del usuario
            return JsonResponse({
                "status": "success",
                "nombre": usuario.nombre,
                "apellido": usuario.apellido,
                "departamento": usuario.departamento.nombre,  # Accede al nombre del departamento relacionado
            })

        except json.JSONDecodeError:
            return JsonResponse({"status": "error", "message": "Formato de datos inválido."}, status=400)
        except Exception as e:
            return JsonResponse({"status": "error", "message": str(e)}, status=500)

    return JsonResponse({"status": "error", "message": "Método no permitido."}, status=405)

from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from .models import Usuario, Departamento

@csrf_exempt
def registrar_usuario(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        legajo = data.get('legajo')
        nombre = data.get('nombre')
        apellido = data.get('apellido')
        dni = data.get('dni')
        contrasenia = data.get('contrasenia')
        departamento_nombre = data.get('departamento')

        # Verificar si el legajo ya está registrado
        try:
            usuario = Usuario.objects.get(legajo=legajo)
            # Si el usuario ya existe, se actualizarán los datos
            usuario.nombre = nombre
            usuario.apellido = apellido
            usuario.dni = dni
            usuario.contrasenia = contrasenia
            # Si el departamento se pasa, se actualiza
            if departamento_nombre:
                departamento = Departamento.objects.get(nombre=departamento_nombre)
                usuario.departamento = departamento
            usuario.save()

            return JsonResponse({'status': 'success', 'message': 'Usuario actualizado exitosamente'})

        except Usuario.DoesNotExist:
            # Si el legajo no existe, registramos un nuevo usuario
            try:
                departamento = Departamento.objects.get(nombre=departamento_nombre)
                usuario = Usuario(
                    legajo=legajo,
                    nombre=nombre,
                    apellido=apellido,
                    dni=dni,
                    contrasenia=contrasenia,
                    departamento=departamento
                )
                usuario.save()

                return JsonResponse({'status': 'success', 'message': 'Usuario registrado exitosamente'})
            except Departamento.DoesNotExist:
                return JsonResponse({'status': 'error', 'message': 'Departamento no encontrado'}, status=404)
        
    return JsonResponse({'status': 'error', 'message': 'Método no permitido'}, status=405)