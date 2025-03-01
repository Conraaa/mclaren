from django.urls import path, include
from . import views
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

from .vistatemporal import eliminar_pista, listar_pistas

#Interacciones
from .interacciones.hardcodeJellyjobs.jellyjobs import getEmpleados, getProfesiones, patchEmpleado
from .interacciones.hardcodeSolvingtickets.solvingtickets import getTickets

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
    path('api/registros/<int:telemetria_id>/', views.RegistrosDeTelemetria.as_view(), name='registros_de_telemetria'),
    path('api/telemetrias/<int:carrera_id>/', views.TelemetriasDeCarrera.as_view(), name='telemetrias_de_carrera'), 
    path('api/login/', views.LoginView.as_view(), name='login'),
    path('verificar-legajo/', views.verificar_legajo, name='verificar_legajo'),
    path('registrar-usuario/', views.registrar_usuario, name='registrar_usuario'),
    path('lista_categoria/', views.CategoriaList.as_view(), name='lista_categoria'),
    path('api/', include(router.urls)),
    
    #Interacciones
    path('jellyjobs/empleados/', getEmpleados, name='jellyjobs_empleados'),
    path('jellyjobs/profesiones/', getProfesiones, name='jellyjobs_profesiones'),
    path('jellyjobs/<int:idtrabajador>/', patchEmpleado.as_view(), name='jellyjobs_patch'),
    path('solvingtickets/', getTickets, name='solvingtickets'),
    
    path('eliminar-pista/<int:id>/', eliminar_pista),
    path('listar-pistas/', listar_pistas),
]
