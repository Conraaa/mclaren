from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, viewsets
from django.contrib.auth.hashers import check_password
from .models import Departamento, Usuario, Categoria, Pieza, Pista, Estrategia, EstrategiaPieza, Carrera, Telemetria, Registro
from .serializers import DepartamentoSerializer, UsuarioSerializer, CategoriaSerializer, PiezaSerializer, PistaSerializer, EstrategiaSerializer, EstrategiaPiezaSerializer, CarreraSerializer, TelemetriaSerializer, RegistroSerializer, LoginSerializer 
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
import jwt
from datetime import datetime, timedelta
from django.conf import settings

from rest_framework.permissions import AllowAny, IsAuthenticated
class DepartamentoViewSet(viewsets.ModelViewSet):
    queryset = Departamento.objects.all()
    serializer_class = DepartamentoSerializer
    def get_permissions(self):
        if self.action in ['list', 'retrieve']:  # Permitir GET sin autenticación
            return [AllowAny()]
        else:  # Requerir autenticación para POST, PUT, DELETE, etc.
            return [IsAuthenticated()]
        
class UsuarioViewSet(viewsets.ModelViewSet):
    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializer
    def get_permissions(self):
        if self.action in ['list', 'retrieve']:  # Permitir GET sin autenticación
            return [AllowAny()]

        
class CategoriaViewSet(viewsets.ModelViewSet):
    queryset = Categoria.objects.all()
    serializer_class = CategoriaSerializer
    def get_permissions(self):
        if self.action in ['list', 'retrieve']:  # Permitir GET sin autenticación
            return [AllowAny()]
        else:  # Requerir autenticación para POST, PUT, DELETE, etc.
            return [IsAuthenticated()]
        
class PiezaViewSet(viewsets.ModelViewSet):
    queryset = Pieza.objects.all()
    serializer_class = PiezaSerializer
    def get_permissions(self):
        if self.action in ['list', 'retrieve']: 
            return [AllowAny()]
        else: 
            return [IsAuthenticated()]


    def get_queryset(self):
        queryset = Pieza.objects.all()
        departamento_id = self.request.query_params.get('departamento_id')

        if departamento_id:
            queryset = queryset.filter(categoria__departamento_id=departamento_id)

        return queryset
    def get_permissions(self):
        if self.action in ['list', 'retrieve']:  # Permitir GET sin autenticación
            return [AllowAny()]
        else:  # Requerir autenticación para POST, PUT, DELETE, etc.
            return [IsAuthenticated()]
            
class TelemetriasDeCarrera(APIView):
    def get(self, request, carrera_id):
        try:
            carrera = Carrera.objects.get(id=carrera_id)
            telemetrias = carrera.telemetrias.all()
            serializer = TelemetriaSerializer(telemetrias, many=True)
            return Response(serializer.data)
        except Carrera.DoesNotExist:
            return Response({"detail": "Carrera no encontrada"}, status=status.HTTP_404_NOT_FOUND)
    def get_permissions(self):
        if self.request.method == 'GET':  # Permitir GET sin autenticación
            return [AllowAny()]
        return [IsAuthenticated()]
           
class RegistrosDeTelemetria(APIView):
    def get(self, request, telemetria_id):
        try:
            telemetria = Telemetria.objects.get(id=telemetria_id)
            registros = telemetria.registros.all()
            serializer = RegistroSerializer(registros, many=True)
            return Response(serializer.data)
        except Telemetria.DoesNotExist:
            return Response({"detail": "Telemetría no encontrada"}, status=status.HTTP_404_NOT_FOUND)
    def get_permissions(self):
        if self.request.method == 'GET':  
            return [AllowAny()]
        return [IsAuthenticated()]
    
class PistaViewSet(viewsets.ModelViewSet):
    queryset = Pista.objects.all()
    serializer_class = PistaSerializer
    

    def create(self, request, *args, **kwargs):
        data = request.data.copy()
        if 'kilometros' in data:
            try:
                data['kilometros'] = round(float(data['kilometros']), 1)
            except ValueError:
                return Response({"error": "El valor de kilometros debe ser un número válido."}, status=400)

        serializer = self.get_serializer(data=data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
    def get_permissions(self):
        if self.action in ['list', 'retrieve']:  # Permitir GET sin autenticación
            return []
        else:  # Requerir autenticación para POST, PUT, DELETE, etc.
            return [IsAuthenticated()]
            
    def update(self, request, *args, **kwargs):
        data = request.data.copy()
        if 'kilometros' in data:
            try:
                data['kilometros'] = round(float(data['kilometros']), 1)
            except ValueError:
                return Response({"error": "El valor de kilometros debe ser un número válido."}, status=400)

        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(serializer.data)

class EstrategiaViewSet(viewsets.ModelViewSet):
    queryset = Estrategia.objects.all()
    serializer_class = EstrategiaSerializer
    def get_permissions(self):
        if self.action in ['list', 'retrieve']:  # Permitir GET sin autenticación
            return [AllowAny()]
        else:  # Requerir autenticación para POST, PUT, DELETE, etc.
            return [IsAuthenticated()]
        
        
class EstrategiaPiezaViewSet(viewsets.ModelViewSet):
    queryset = EstrategiaPieza.objects.all()
    serializer_class = EstrategiaPiezaSerializer
    def get_permissions(self):
        if self.action in ['list', 'retrieve']:  # Permitir GET sin autenticación
            return [AllowAny()]
        else:  # Requerir autenticación para POST, PUT, DELETE, etc.
            return [IsAuthenticated()]

class CarreraViewSet(viewsets.ModelViewSet):
    queryset = Carrera.objects.all()
    serializer_class = CarreraSerializer
    def get_permissions(self):
        if self.action in ['list', 'retrieve']:  # Permitir GET sin autenticación
            return [AllowAny()]
        else:  # Requerir autenticación para POST, PUT, DELETE, etc.
            return [IsAuthenticated()]

class TelemetriaViewSet(viewsets.ModelViewSet):
    queryset = Telemetria.objects.all()
    serializer_class = TelemetriaSerializer
    def get_permissions(self):
        if self.action in ['list', 'retrieve']:  # Permitir GET sin autenticación
            return [AllowAny()]
        else:  # Requerir autenticación para POST, PUT, DELETE, etc.
            return [IsAuthenticated()]
        
class RegistroViewSet(viewsets.ModelViewSet):
    queryset = Registro.objects.all()
    serializer_class = RegistroSerializer
    def get_permissions(self):
        if self.action in ['list', 'retrieve']:  # Permitir GET sin autenticación
            return [AllowAny()]
        else:  # Requerir autenticación para POST, PUT, DELETE, etc.
            return [IsAuthenticated()]
class CategoriaList(APIView):
    def get(self, request, *args, **kwargs):
        departamento_id = request.query_params.get('departamento_id')
        
        if departamento_id:
            categorias = Categoria.objects.filter(departamento_id=departamento_id)
        else:
            categorias = Categoria.objects.all() 
        
        return Response([categoria.to_dict() for categoria in categorias], status=status.HTTP_200_OK)
    def get_permissions(self):
        if self.action in ['list', 'retrieve']:  # Permitir GET sin autenticación
            return [AllowAny()]
        else:  # Requerir autenticación para POST, PUT, DELETE, etc.
            return [IsAuthenticated()]
class LoginView(APIView):
    permission_classes = [AllowAny]  # Permitir acceso público al login

    def post(self, request):
        serializer = LoginSerializer(data=request.data)

        if serializer.is_valid():
            legajo = serializer.validated_data['legajo']
            contrasenia = serializer.validated_data['contrasenia']

            # Buscar el usuario por legajo
            try:
                usuario = Usuario.objects.get(legajo=legajo)

                # Verificar la contraseña
                if check_password(contrasenia, usuario.contrasenia):
                    # Generar tokens de acceso y refresco
                    access_token = jwt.encode({
                        'user_id': usuario.id,
                        'exp': datetime.utcnow() + timedelta(hours=1)
                    }, settings.SECRET_KEY, algorithm='HS256')

                    refresh_token = jwt.encode({
                        'user_id': usuario.id,
                        'exp': datetime.utcnow() + timedelta(days=7)
                    }, settings.SECRET_KEY, algorithm='HS256')

                    return Response({
                        "message": "Login exitoso",
                        "access": access_token,
                        "refresh": refresh_token,
                        "nombre": usuario.nombre,
                        "departamento": usuario.departamento.nombre,
                        "legajo": usuario.legajo,
                    }, status=status.HTTP_200_OK)
                else:
                    return Response({"error": "Contraseña incorrecta"}, status=status.HTTP_401_UNAUTHORIZED)

            except Usuario.DoesNotExist:
                return Response({"error": "Legajo no encontrado"}, status=status.HTTP_404_NOT_FOUND)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# Endpoint para verificar legajo
@csrf_exempt
def verificar_legajo(request):
    if request.method == "POST":
        try:
            body = json.loads(request.body)
            legajo = body.get("legajo")

            if not legajo:
                return JsonResponse({"status": "error", "message": "El legajo es requerido."}, status=400)

            usuario = Usuario.objects.filter(legajo=legajo).select_related('departamento').first()

            if not usuario:
                return JsonResponse({"status": "error", "message": "Legajo no encontrado."}, status=404)

            return JsonResponse({
                "status": "success",
                "nombre": usuario.nombre,
                "apellido": usuario.apellido,
                "departamento": usuario.departamento.nombre,
                "dni": usuario.dni
            })

        except json.JSONDecodeError:
            return JsonResponse({"status": "error", "message": "Formato de datos inválido."}, status=400)
        except Exception as e:
            return JsonResponse({"status": "error", "message": str(e)}, status=500)

    return JsonResponse({"status": "error", "message": "Método no permitido."}, status=405)


# Endpoint para registrar usuario
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

        try:
            usuario = Usuario.objects.get(legajo=legajo)
            usuario.nombre = nombre
            usuario.apellido = apellido
            usuario.dni = dni
            usuario.contrasenia = make_password(contrasenia)  # Encriptar la contraseña
            if departamento_nombre:
                departamento = Departamento.objects.get(nombre=departamento_nombre)
                usuario.departamento = departamento
            usuario.save()

            return JsonResponse({'status': 'success', 'message': 'Usuario actualizado exitosamente'})

        except Usuario.DoesNotExist:
            try:
                departamento = Departamento.objects.get(nombre=departamento_nombre)
                usuario = Usuario(
                    legajo=legajo,
                    nombre=nombre,
                    apellido=apellido,
                    dni=dni,
                    contrasenia=make_password(contrasenia),  # Encriptar la contraseña
                    departamento=departamento
                )
                usuario.save()

                return JsonResponse({'status': 'success', 'message': 'Usuario registrado exitosamente'})
            except Departamento.DoesNotExist:
                return JsonResponse({'status': 'error', 'message': 'Departamento no encontrado'}, status=404)

    return JsonResponse({'status': 'error', 'message': 'Método no permitido'}, status=405)