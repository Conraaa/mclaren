from django.http import JsonResponse

def getTickets(request):
    if request.method == "GET":
        tickets = [
            {"idtrabajador": "1","nombre": "Juan","apellido": "Perez", "idprofesion": "1"},
            {"idtrabajador": "2","nombre": "Jorge","apellido": "Alvarez", "idprofesion": "1"},
            {"idtrabajador": "3","nombre": "Carlos Andrés","apellido": "Gutiérrez Márquez", "idprofesion": "1"},
            {"idtrabajador": "4","nombre": "Mariana Sofía","apellido": "Herrera", "idprofesion": "1"},
            {"idtrabajador": "5","nombre": "Fernando","apellido": "Castillo", "idprofesion": "1"},
            {"idtrabajador": "6","nombre": "Andrea Valentina","apellido": "Torres", "idprofesion": "1"},
            {"idtrabajador": "7","nombre": "Camila","apellido": "Molina", "idprofesion": "1"},
            {"idtrabajador": "8","nombre": "Emmanuel","apellido": "Rojas", "idprofesion": "1"},
            {"idtrabajador": "9","nombre": "Carla","apellido": "Mendoza", "idprofesion": "1"},
            {"idtrabajador": "10","nombre": "Elena","apellido": "Ruiz", "idprofesion": "1"},
        ]
        return JsonResponse({"tickets": tickets}, safe=False)