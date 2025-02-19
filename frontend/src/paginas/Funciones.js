import {pistaImages, pistaToRound} from "./Carreras/imports.js";
export const handleSubmit = async (nombre, kilometros, pais, ciudad, foto, handleClose) => {
  const nuevaPista = { nombre, kilometros, pais, ciudad, foto };
  console.log(nuevaPista);
  try {
    const formData = new FormData();
    formData.append("nombre", nuevaPista.nombre);
    formData.append("kilometros", nuevaPista.kilometros);
    formData.append("pais", nuevaPista.pais);
    formData.append("ciudad", nuevaPista.ciudad);
    formData.append("imagen", nuevaPista.foto);
    const response = await fetch("http://localhost:8000/api/pistas/", {
      method: "POST",
      body: formData,
    });
    if (!response.ok) throw new Error("Error al enviar la pista");
    const data = await response.json();
    console.log("Pista guardada exitosamente:", data);
    handleClose();
  } catch (error) {
    console.error("Error al enviar la pista:", error);
    alert(`Hubo un error al guardar la pista: ${error.message}`);
  }
};

export const fetchCircuitos = async (setCircuitos, setLoading) => {
  try {
    const response = await fetch('http://localhost:8000/api/pistas/');
    const data = await response.json();
    setCircuitos(data);
  } catch (error) {
    console.error("Error al obtener los circuitos:", error);
  } finally {
    setLoading(false);
  }
};


export const fetchEmpleados = async (setData) => {
  try {
    const [empleadosRes, departamentosRes] = await Promise.all([
      fetch("http://127.0.0.1:8000/api/usuarios/"),
      fetch("http://127.0.0.1:8000/api/departamentos/")
    ]);
    
    if (!empleadosRes.ok || !departamentosRes.ok) {
      console.error("Error al obtener datos:", empleadosRes.statusText, departamentosRes.statusText);
      return;
    }
    
    const empleados = await empleadosRes.json();
    const departamentos = await departamentosRes.json();
    
    const formattedData = empleados.map((empleado) => {
      const departamento = departamentos.find(dept => dept.id === empleado.departamento);
      return [
        empleado.nombre,
        empleado.apellido,
        empleado.legajo,
        departamento ? departamento.nombre : "Desconocido"
      ];
    });
    
    setData(formattedData);
  } catch (error) {
    console.error("Error al conectar con el servidor:", error);
  }
};

export const fetchCarreras = async (setCarreras) => {
  try {
    const response = await fetch("http://localhost:8000/api/carreras/");
    const data = await response.json();
    setCarreras(data);
  } catch (error) {
    console.error("Error al obtener las carreras:", error);
  }
};

export const handleShowDetails = async (circuito, setSelectedCircuito) => {
  console.log("Fetching telemetry data for circuito:", circuito);

  try {
    // Obtener todas las telemetrías de la carrera
    const response = await fetch(`http://localhost:8000/api/telemetrias/?carrera=${circuito.id}`);
    console.log("Response status:", response.status);

    if (!response.ok) {
      throw new Error("Error fetching telemetria data");
    }

    const telemetrias = await response.json();
    console.log("Telemetry data received:", telemetrias);

    if (!Array.isArray(telemetrias) || telemetrias.length < 2) {
      throw new Error("No hay suficientes datos de telemetría para mostrar");
    }

    // Determinar cuál es Norris y cuál es Piastri
    const sortedTelemetrias = telemetrias.sort((a, b) => a.id - b.id);
    const telemetriaNorris = sortedTelemetrias[0]; // ID menor
    const telemetriaPiastri = sortedTelemetrias[1]; // ID mayor

    console.log("Telemetria Norris ID:", telemetriaNorris.id);
    console.log("Telemetria Piastri ID:", telemetriaPiastri.id);

    // Obtener los registros en paralelo
    const [registrosNorris, registrosPiastri] = await Promise.all([
      fetch(`http://localhost:8000/api/registros/?telemetria=${telemetriaNorris.id}`)
        .then(res => res.ok ? res.json() : Promise.reject("Error fetching registros de Norris")),
      fetch(`http://localhost:8000/api/registros/?telemetria=${telemetriaPiastri.id}`)
        .then(res => res.ok ? res.json() : Promise.reject("Error fetching registros de Piastri"))
    ]);

    console.log("Registros Norris:", registrosNorris);
    console.log("Registros Piastri:", registrosPiastri);

    // Formatear datos y convertir tiempos a números
    const formattedNorris = registrosNorris
      .map(registro => ({
        vuelta: registro.numVuelta,
        tiempo: parseFloat(registro.valor.replace(':', ''))
      }))
      .sort((a, b) => a.vuelta - b.vuelta); // Ordenar por número de vuelta

    const formattedPiastri = registrosPiastri
      .map(registro => ({
        vuelta: registro.numVuelta,
        tiempo: parseFloat(registro.valor.replace(':', ''))
      }))
      .sort((a, b) => a.vuelta - b.vuelta); // Ordenar por número de vuelta

    // Guardar en el estado
    setSelectedCircuito({ 
      ...circuito, 
      telemetriaNorris: formattedNorris, 
      telemetriaPiastri: formattedPiastri 
    });

    console.log("Selected circuito updated:", { 
      ...circuito, 
      telemetriaNorris: formattedNorris, 
      telemetriaPiastri: formattedPiastri 
    });

  } catch (error) {
    console.error("Error fetching telemetria data:", error);
    alert("Error fetching telemetria data. Please try again later.");
  }
};



// Importa las imágenes de las pistas

export const fetchPistasYEstrategias = async (setPistas, setEstrategias) => {
  try {
    const responsePistas = await fetch("http://localhost:8000/api/pistas/");
    if (!responsePistas.ok) throw new Error("Error al obtener las pistas");
    const dataPistas = await responsePistas.json();
    setPistas(dataPistas);

    const responseEstrategias = await fetch("http://localhost:8000/api/estrategias/");
    if (!responseEstrategias.ok) throw new Error("Error al obtener las estrategias");
    const dataEstrategias = await responseEstrategias.json();
    setEstrategias(dataEstrategias);
  } catch (error) {
    console.error("Error al obtener datos:", error);
    setPistas([]);
    setEstrategias([]);
    alert("No se pudieron cargar las pistas y estrategias, por favor intenta más tarde.");
  }
};

export const handleSubmitCarrera = async (
  anio,
  pistaNombre,
  cantVueltas,
  estrategiaNombre,
  setCarreras,
  carreras,
  handleClose,
  pistas,
  estrategias
) => {
  console.log("Submitting carrera with pista:", pistaNombre, "and estrategia:", estrategiaNombre);

  if (!pistaNombre) {
    alert("Por favor, selecciona una pista");
    return;
  }

  console.log("pistas:", pistas);
  console.log("estrategias:", estrategias);

  if (!Array.isArray(pistas) || !Array.isArray(estrategias)) {
    alert("Error al cargar pistas o estrategias");
    return;
  }

  const pistaSeleccionada = pistas.find(p => p.nombre === pistaNombre);
  const estrategiaSeleccionada = estrategias.find(e => e.nombre === estrategiaNombre);

  console.log("Pista seleccionada:", pistaSeleccionada);
  console.log("Estrategia seleccionada:", estrategiaSeleccionada);

  if (!pistaSeleccionada || !estrategiaSeleccionada) {
    alert("Pista o estrategia no encontrada");
    return;
  }

  const circuitName = pistaToRound[pistaNombre];
  if (!circuitName) {
    alert("No se encontró el CircuitName para la pista seleccionada");
    return;
  }

  try {
    // Obtener el round correspondiente al circuito
    const responseRounds = await fetch(`http://ergast.com/api/f1/${anio}.json`);
    const dataRounds = await responseRounds.json();
    console.log("Rounds fetched:", dataRounds);

    const race = dataRounds.MRData.RaceTable.Races.find(r => r.Circuit.circuitName === circuitName);
    if (!race) {
      alert("No se encontró la ronda de la pista en la API de Ergast");
      return;
    }
    const roundBuscada = race.round;

    // Obtener telemetría de los pilotos
    const pilotos = ["norris", "piastri"];
    let telemetriaNorris = [];
    let telemetriaPiastri = [];

    const responses = await Promise.all(
      pilotos.map(piloto =>
        fetch(`http://ergast.com/api/f1/${anio}/${roundBuscada}/drivers/${piloto}/laps?limit=100&offset=0`)
      )
    );

    for (let i = 0; i < responses.length; i++) {
      const textData = await responses[i].text();
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(textData, "text/xml");
      const laps = Array.from(xmlDoc.getElementsByTagName("Lap"));

      if (laps.length === 0) {
        console.warn(`No se encontraron vueltas para ${pilotos[i]}`);
        continue;
      }

      // Ajustar la cantidad de vueltas según la disponibilidad
      const vueltasDisponibles = laps.length;
      cantVueltas = Math.min(cantVueltas, vueltasDisponibles);

      const telemetria = laps.slice(0, cantVueltas).map(lap => {
        const lapNumber = lap.getAttribute("number");
        const timing = lap.getElementsByTagName("Timing")[0];

        if (!timing) {
          console.warn(`No hay tiempo para la vuelta ${lapNumber}`);
          return { vuelta: lapNumber, tiempo: "N/A" };
        }

        const rawTime = timing.getAttribute("time"); // Ej: "1:23.456"
        
        // Convertir tiempo a segundos
        const timeParts = rawTime.split(":"); // ["1", "23.456"]
        let tiempoSegundos = 0;

        if (timeParts.length === 2) {
          const minutos = parseInt(timeParts[0], 10);
          const segundos = parseFloat(timeParts[1]);
          tiempoSegundos = minutos * 60 + segundos;
        } else {
          tiempoSegundos = parseFloat(timeParts[0]);
        }

        return {
          vuelta: parseInt(lapNumber, 10),
          tiempo: tiempoSegundos.toFixed(3) // Mantener 3 decimales
        };
      });

      if (pilotos[i] === "norris") {
        telemetriaNorris = telemetria;
      } else {
        telemetriaPiastri = telemetria;
      }
    }

    // Buscar la imagen de la pista en imports.js
    const nombrePistaLimpio = pistaNombre.replace(/\s+/g, '').toLowerCase();
    const imagenKey = Object.keys(pistaImages).find(key => key.toLowerCase() === nombrePistaLimpio);
    if (!imagenKey) {
      alert("No se encontró la imagen para la pista seleccionada");
      return;
    }
    const imagenURL = pistaImages[imagenKey];
    const respuestaImagen = await fetch(imagenURL);
    const imagenBlob = await respuestaImagen.blob();
    const imagenArchivo = new File([imagenBlob], `${imagenKey}.jpg`, { type: "image/jpeg" });

    // Construir el objeto de la carrera
    const nuevaCarrera = {
      anio,
      pista: pistaSeleccionada.id,
      cantVueltas,
      estrategia: estrategiaSeleccionada.id,
      imagen: imagenArchivo
    };

    console.log("Enviando carrera al backend:", nuevaCarrera);

    // Enviar la carrera al backend usando FormData
    const formData = new FormData();
    formData.append("anio", nuevaCarrera.anio);
    formData.append("pista", nuevaCarrera.pista);
    formData.append("cantVueltas", nuevaCarrera.cantVueltas);
    formData.append("estrategia", nuevaCarrera.estrategia);
    formData.append("imagen", nuevaCarrera.imagen);

    const responseCarrera = await fetch("http://localhost:8000/api/carreras/", {
      method: "POST",
      body: formData
    });

    if (!responseCarrera.ok) {
      const errorResponse = await responseCarrera.json();
      console.error("Error del backend:", errorResponse);
      alert(`Error al guardar la carrera: ${JSON.stringify(errorResponse)}`);
      return;
    }

    const dataCarrera = await responseCarrera.json();
    console.log("Carrera guardada exitosamente:", dataCarrera);

    const carreraId = dataCarrera.id;

    // Crear dos telemetrías, una para Norris y otra para Piastri
    const telemetrias = [
      { carrera: carreraId }, // Telemetría para Norris
      { carrera: carreraId }  // Telemetría para Piastri
    ];

    const telemetriaIds = [];

    // Enviar las telemetrías individualmente
    for (const telemetria of telemetrias) {
      console.log("Enviando telemetría al backend:", telemetria);

      const responseTelemetria = await fetch("http://localhost:8000/api/telemetrias/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(telemetria)
      });

      if (!responseTelemetria.ok) {
        const errorResponse = await responseTelemetria.json();
        console.error("Error al guardar la telemetría:", errorResponse);
        alert(`Error al guardar la telemetría: ${JSON.stringify(errorResponse)}`);
        return;
      }

      const dataTelemetria = await responseTelemetria.json();
      console.log("Telemetría guardada exitosamente:", dataTelemetria);

      // Guardar el ID de la telemetría creada
      telemetriaIds.push(dataTelemetria.id);
    }

    // Asociar los registros a las telemetrías correspondientes
    const registros = [
      ...telemetriaNorris.map((r) => ({
        valor: r.tiempo, // Tiempo de la vuelta como cadena
        numVuelta: parseInt(r.vuelta), // Número de la vuelta como entero
        telemetria: telemetriaIds[0] // ID de la telemetría de Norris
      })),
      ...telemetriaPiastri.map((r) => ({
        valor: r.tiempo, // Tiempo de la vuelta como cadena
        numVuelta: parseInt(r.vuelta), // Número de la vuelta como entero
        telemetria: telemetriaIds[1] // ID de la telemetría de Piastri
      }))
    ];

    console.log("Registros generados:", registros);

    // Validar que todos los registros tengan los campos requeridos
    const registrosValidos = registros.every(registro => 
      registro.valor && typeof registro.numVuelta === "number" && registro.telemetria
    );

    if (!registrosValidos) {
      console.error("Algunos registros no tienen los campos requeridos:", registros);
      alert("Error: Algunos registros no tienen los campos requeridos.");
      return;
    }

    // Enviar los registros al backend uno por uno
    for (const registro of registros) {
      console.log("Enviando registro al backend:", registro);

      const responseRegistro = await fetch("http://localhost:8000/api/registros/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(registro) // Enviar un solo registro
      });

      if (!responseRegistro.ok) {
        const errorResponse = await responseRegistro.json();
        console.error("Error al guardar el registro:", errorResponse);
        alert(`Error al guardar el registro: ${JSON.stringify(errorResponse)}`);
        return;
      }

      const dataRegistro = await responseRegistro.json();
      console.log("Registro guardado exitosamente:", dataRegistro);
    }

    // Actualizar el estado y el localStorage
    const carreraCompleta = {
      id: carreraId,
      anio,
      pista: pistaSeleccionada.id,
      cantVueltas,
      estrategia: estrategiaSeleccionada.id,
      telemetrias: [
        { id: telemetriaIds[0], piloto: "norris", registros: telemetriaNorris },
        { id: telemetriaIds[1], piloto: "piastri", registros: telemetriaPiastri }
      ]
    };

    setCarreras([...carreras, carreraCompleta]);
    localStorage.setItem("carreras", JSON.stringify([...carreras, carreraCompleta]));

    // Cerrar el modal
    handleClose();
  } catch (error) {
    console.error("Error al procesar la carrera:", error);
    alert(`Hubo un error al procesar la carrera: ${error.message}`);
  }
};


export const checkTelemetria = async (setTelemetriaStatus, setIsTelemetriaChecked) => {
  setIsTelemetriaChecked(true);
  try {
    const response = await fetch("http://ergast.com/api/f1/2024/5", { method: "GET" });
    setTelemetriaStatus(response.ok ? "✔" : "✘");
  } catch (error) {
    setTelemetriaStatus("✘");
  }
};



