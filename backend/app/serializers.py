# serializers.py
from rest_framework import serializers
from .models import Usuario, Departamento
from rest_framework import serializers

class LoginSerializer(serializers.Serializer):
    legajo = serializers.IntegerField()
    contrasenia = serializers.CharField()


class DepartamentoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Departamento
        fields = ['nombre']

class UsuarioSerializer(serializers.ModelSerializer):
    departamento = DepartamentoSerializer()  # Incluye el nombre del departamento

    class Meta:
        model = Usuario
        fields = ['id', 'nombre', 'apellido', 'legajo', 'departamento']
