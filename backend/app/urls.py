from django.urls import path, include
from rest_framework.routers import DefaultRouter
<<<<<<< HEAD
from . import views
from .views import TelemetriasDeCarrera, RegistrosDeTelemetria

=======
from .views import TelemetriasDeCarrera
from .views import RegistrosDeTelemetria
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
>>>>>>> 63604334241dcba32d1c0bd92bcb00bab6274792
router = DefaultRouter()
router.register('departamentos', views.DepartamentoViewSet)
router.register('usuarios', views.UsuarioViewSet)
router.register('categorias', views.CategoriaViewSet)
router.register('piezas', views.PiezaViewSet)
router.register('pistas', views.PistaViewSet)
router.register('estrategias', views.EstrategiaViewSet)
router.register('estrategiapiezas', views.EstrategiaPiezaViewSet)
router.register('carreras', views.CarreraViewSet)
router.register('telemetrias', views.TelemetriaViewSet)
router.register('registros', views.RegistroViewSet)

urlpatterns = [
<<<<<<< HEAD


=======
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
>>>>>>> 63604334241dcba32d1c0bd92bcb00bab6274792
    path('api/registros/<int:telemetria_id>/', RegistrosDeTelemetria.as_view(), name='registros_de_telemetria'),
    path('api/telemetrias/<int:carrera_id>/', TelemetriasDeCarrera.as_view(), name='telemetrias_de_carrera'),
    path('api/login/', views.LoginView.as_view(), name='login'),
    path('verificar-legajo/', views.verificar_legajo, name='verificar_legajo'),
    path('registrar-usuario/', views.registrar_usuario, name='registrar_usuario'),
    path('lista_categoria/', views.CategoriaList.as_view(), name='lista_categoria'),


    path('api/', include(router.urls)),
]