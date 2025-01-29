from django.urls import path, include
from . import views
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register('departamentos', views.DepartamentoViewSet)
router.register('usuarios', views.UsuarioViewSet)
router.register('tickets', views.TicketViewSet)
router.register('categorias', views.CategoriaViewSet)
router.register('piezas', views.PiezaViewSet)
router.register('pistas', views.PistaViewSet)
router.register('estrategias', views.EstrategiaViewSet)
router.register('estrategiapiezas', views.EstrategiaPiezaViewSet)
router.register('carreras', views.CarreraViewSet)
router.register('telemetrias', views.TelemetriaViewSet)
router.register('registros', views.RegistroViewSet)

urlpatterns = [
    path('api/login/', views.LoginView.as_view(), name='login'),
    path('verificar-legajo/', views.verificar_legajo, name='verificar_legajo'),
    path('registrar-usuario/', views.registrar_usuario, name='registrar_usuario'),
    
    path('api/', include(router.urls)),
]
