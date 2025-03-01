from django.http import JsonResponse

def getTickets(request):
    if request.method == "GET":
        usuario_dni = request.GET.get('Usuario_DNI')
        tickets = [
            {"Asunto": "Problema de conexion","Estado": "P","Prioridad": "A","Categoria": "Mclaren","Usuario_DNI": "101", "Usuario_Nombre": "Estratega", "Mensaje": "Desde esta mañana estoy experimentando problemas de conexion con el sistema. La conexion es inestable y no puedo acceder correctamente. He intentado varias soluciones sin exito. Agradeceria su ayuda para resolver este inconveniente lo antes posible.", "Respuesta": []},
            {"Asunto": "Imposibilidad de dar de alta carreras","Estado": "C","Prioridad": "A","Categoria": "Mclaren","Usuario_DNI": "102", "Usuario_Nombre": "Mecanico", "Mensaje": "Estoy teniendo problemas para dar de alta nuevas carreras en el sistema. Al intentarlo, aparece un error y no se completa el registro. He probado diferentes opciones, pero el problema persiste. Agradeceria su ayuda para solucionarlo lo antes posible.", "Respuesta": []},
            {"Asunto": "Problema al cargar nuevas pistas","Estado": "P","Prioridad": "A","Categoria": "Mclaren","Usuario_DNI": "103", "Usuario_Nombre": "Aerodinamista", "Mensaje": "Estoy teniendo dificultades al intentar cargar nuevas pistas en el sistema. Cuando intento completar el proceso, no se guarda la informacion y no aparece ningún mensaje de error. Agradeceria su ayuda para solucionar este inconveniente.", "Respuesta": []},
            {"Asunto": "Imposibilidad de ingresar nuevas estrategias","Estado": "C","Prioridad": "A","Categoria": "Mclaren","Usuario_DNI": "101", "Usuario_Nombre": "Estratega", "Mensaje": "Al intentar ingresar nuevas estrategias en el sistema, me encuentro con un error que impide completar la carga. Ya he intentado varias veces, pero el problema persiste. Agradeceria su ayuda para resolverlo.", "Respuesta": []},
            {"Asunto": "Error al agregar piezas al sistema","Estado": "P","Prioridad": "A","Categoria": "Mclaren","Usuario_DNI": "102", "Usuario_Nombre": "Mecanico", "Mensaje": "Al intentar agregar nuevas piezas al sistema, me aparece un error y no puedo completar el proceso. He intentado seguir los pasos correctamente, pero el problema persiste. Solicito su asistencia para solucionarlo.", "Respuesta": []},
            {"Asunto": "Imposibilidad de contratar empleados","Estado": "C","Prioridad": "A","Categoria": "Mclaren","Usuario_DNI": "103", "Usuario_Nombre": "Aerodinamista", "Mensaje": "Estoy experimentando un problema al intentar contratar nuevos empleados a traves del sistema. El proceso no se completa correctamente y no aparece ningun mensaje de error claro. Agradeceria su ayuda para resolver este inconveniente.", "Respuesta": []},
        ]
        if usuario_dni:
            tickets = [ticket for ticket in tickets if ticket["Usuario_DNI"] == usuario_dni]
        return JsonResponse({"tickets": tickets}, safe=False)