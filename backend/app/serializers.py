from rest_framework import serializers
from .models import Departamento, Usuario, Categoria, Pieza, Pista, Estrategia, EstrategiaPieza, Carrera, Telemetria, Registro 
from datetime import timedelta

class BaseModelSerializer(serializers.ModelSerializer):                         #Serializador Base
    restricted_fields = ['nombre', 'apellido', 'ciudad', 'pais']                #Array de los campos a validar
    
    def validate(self, data):
        if self.Meta.model.__name__ == "Pieza":     #Si el modelo es pieza, devuelve la data sin validar (permite que el nombre de piezas tenga numeros)
            return data
        
        for field_name, value in data.items():
            if field_name in self.restricted_fields:
                if isinstance(value, str) and any(char.isdigit() for char in value):        #Valida solo los campos CharField
                    raise serializers.ValidationError(
                        {field_name: "Este campo no puede contener números."}
                    )
        return data

class DepartamentoSerializer(BaseModelSerializer):
    class Meta:
        model = Departamento
        fields = '__all__'
        
class UsuarioSerializer(BaseModelSerializer):
    departamento_nombre = serializers.ReadOnlyField(source='departamento.nombre')
    contrasenia = serializers.CharField(write_only=True)

    class Meta:
        model = Usuario
        fields = '__all__'
        
    def create(self, validated_data):
        contrasenia = validated_data.pop('contrasenia')  #Obtengo la contraseña de los datos validados
        usuario = Usuario(**validated_data)
        usuario.set_contrasenia(contrasenia)             #Cifro la contraseña antes de guardar
        usuario.save()
        return usuario

    def update(self, instance, validated_data):
        contrasenia = validated_data.pop('contrasenia', None)
        instance = super().update(instance, validated_data)
        if contrasenia:
            instance.set_contrasenia(contrasenia)        #Si se cambia la contraseña, se cifra
        instance.save()
        return instance

class CategoriaSerializer(BaseModelSerializer):
    departamento_nombre = serializers.ReadOnlyField(source='departamento.nombre')

    class Meta:
        model = Categoria
        fields = '__all__'

class PiezaSerializer(BaseModelSerializer):
    categoria_nombre = serializers.ReadOnlyField(source='categoria.nombre')
    categoria_departamento = serializers.ReadOnlyField(source='categoria.departamento.nombre')

    class Meta:
        model = Pieza
        fields = '__all__'

class PistaSerializer(BaseModelSerializer):
    class Meta:
        model = Pista
        fields = '__all__'

class EstrategiaSerializer(BaseModelSerializer):
    pista_nombre = serializers.ReadOnlyField(source='pista.nombre')

    class Meta:
        model = Estrategia
        fields = '__all__'
        
    nombre = serializers.ChoiceField(choices=Estrategia.ESTRATEGIAS)

class EstrategiaPiezaSerializer(BaseModelSerializer):
    estrategia_nombre = serializers.ReadOnlyField(source='estrategia.nombre')
    pieza_nombre = serializers.ReadOnlyField(source='pieza.nombre')

    class Meta:
        model = EstrategiaPieza
        fields = '__all__'

class CarreraSerializer(BaseModelSerializer):
    pista_nombre = serializers.ReadOnlyField(source='pista.nombre')
    estrategia_nombre = serializers.ReadOnlyField(source='estrategia.nombre')

    class Meta:
        model = Carrera
        fields = '__all__'

class TelemetriaSerializer(BaseModelSerializer):
    carrera_anio = serializers.ReadOnlyField(source='carrera.anio')
    carrera_pista = serializers.ReadOnlyField(source='carrera.pista.nombre')
    carrera_estrategia = serializers.ReadOnlyField(source='carrera.estrategia.nombre')

    class Meta:
        model = Telemetria
        fields = '__all__'

class RegistroSerializer(BaseModelSerializer):
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