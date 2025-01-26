from django.urls import path
from . import views
urlpatterns = [
    path('api/login/', views.LoginView.as_view(), name='login'),
    path('verificar-legajo/', views.verificar_legajo, name='verificar_legajo'),
    path('registrar-usuario/', views.registrar_usuario, name='registrar_usuario'),
    path('api/empleados/', views.UsuarioListView.as_view(), name='empleados-list'),
]
