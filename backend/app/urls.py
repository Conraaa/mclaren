from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views
from .views import TelemetriasDeCarrera, RegistrosDeTelemetria
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
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



    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/registros/<int:telemetria_id>/', RegistrosDeTelemetria.as_view(), name='registros_de_telemetria'),
    path('api/telemetrias/<int:carrera_id>/', TelemetriasDeCarrera.as_view(), name='telemetrias_de_carrera'),
    path('api/login/', views.LoginView.as_view(), name='login'),
    path('verificar-legajo/', views.verificar_legajo, name='verificar_legajo'),
    path('registrar-usuario/', views.registrar_usuario, name='registrar_usuario'),
    path('lista_categoria/', views.CategoriaList.as_view(), name='lista_categoria'),


    path('api/', include(router.urls)),
]
