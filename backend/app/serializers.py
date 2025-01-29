from rest_framework import serializers
from .models import Departamento, Usuario, Ticket, Categoria, Pieza, Pista, Estrategia, EstrategiaPieza, Carrera, Telemetria, Registro 
from datetime import timedelta

class DepartamentoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Departamento
        fields = '__all__'
        
class UsuarioSerializer(serializers.ModelSerializer):
    departamento_nombre = serializers.ReadOnlyField(source='departamento.nombre')

    class Meta:
        model = Usuario
        fields = '__all__'
        
class TicketSerializer(serializers.ModelSerializer):
    usuario_dni = serializers.ReadOnlyField(source='usuario.dni')
    usuario_legajo = serializers.ReadOnlyField(source='usuario.legajo')
    usuario_departamento = serializers.ReadOnlyField(source='usuario.departamento.nombre')

    class Meta:
        model = Ticket
        fields = '__all__'

class CategoriaSerializer(serializers.ModelSerializer):
    departamento_nombre = serializers.ReadOnlyField(source='departamento.nombre')

    class Meta:
        model = Categoria
        fields = '__all__'

class PiezaSerializer(serializers.ModelSerializer):
    categoria_nombre = serializers.ReadOnlyField(source='categoria.nombre')
    categoria_departamento = serializers.ReadOnlyField(source='categoria.departamento.nombre')

    class Meta:
        model = Pieza
        fields = '__all__'

class PistaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pista
        fields = '__all__'

class EstrategiaSerializer(serializers.ModelSerializer):
    pista_nombre = serializers.ReadOnlyField(source='pista.nombre')

    class Meta:
        model = Estrategia
        fields = '__all__'
        
    nombre = serializers.ChoiceField(choices=Estrategia.ESTRATEGIAS)

class EstrategiaPiezaSerializer(serializers.ModelSerializer):
    estrategia_nombre = serializers.ReadOnlyField(source='estrategia.nombre')
    pieza_nombre = serializers.ReadOnlyField(source='pieza.nombre')

    class Meta:
        model = EstrategiaPieza
        fields = '__all__'

class CarreraSerializer(serializers.ModelSerializer):
    pista_nombre = serializers.ReadOnlyField(source='pista.nombre')
    estrategia_nombre = serializers.ReadOnlyField(source='estrategia.nombre')

    class Meta:
        model = Carrera
        fields = '__all__'

class TelemetriaSerializer(serializers.ModelSerializer):
    carrera_anio = serializers.ReadOnlyField(source='carrera.anio')
    carrera_pista = serializers.ReadOnlyField(source='carrera.pista.nombre')
    carrera_estrategia = serializers.ReadOnlyField(source='carrera.estrategia.nombre')

    class Meta:
        model = Telemetria
        fields = '__all__'

class RegistroSerializer(serializers.ModelSerializer):
    telemetria_numVuelta = serializers.ReadOnlyField(source='telemetria.numVuelta')
    
    valor_segundos = serializers.SerializerMethodField()

    class Meta:
        model = Registro
        fields = '__all__'
        
    def get_valor_segundos(self, obj):
        try:
            minutos, segundos_milisegundos = obj.valor.split(":")
            segundos, milisegundos = segundos_milisegundos.split(".")
            delta = timedelta(
                minutes=int(minutos),
                seconds=int(segundos),
                milliseconds=int(milisegundos)
            )
            return delta.total_seconds()
        except (ValueError, AttributeError):
            return None

class LoginSerializer(serializers.Serializer):
    legajo = serializers.IntegerField()
    contrasenia = serializers.CharField()