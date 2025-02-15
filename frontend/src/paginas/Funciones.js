import pistaImages from "./Carreras/imports.js";
export const handleSubmit = async (nombre, kilometros, pais, ciudad, foto, handleClose) => {
  const nuevaPista = { nombre, kilometros, pais, ciudad, foto };
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
    handleClose();
  } catch (error) {
    console.error("Error al enviar la pista:", error);
    alert(`Hubo un error al guardar la pista: ${error.message}`);
  }
};

// Funciones de /c:/Users/Pcstore/OneDrive/Documentos/mclaren/mclaren/frontend/src/paginas/Pistas/carta.jsx
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

// Funciones de /c:/Users/Pcstore/OneDrive/Documentos/mclaren/mclaren/frontend/src/paginas/Home/home.jsx
export const fetchClasificacionPilotos = async (setClasificacionPilotos) => {
  try {
    const response = await fetch('https://ergast.com/api/f1/2024/driverStandings.json');
    const data = await response.json();
    const standings = data.MRData.StandingsTable.StandingsLists[0].DriverStandings;
    setClasificacionPilotos(standings);
  } catch (error) {
    console.error('Error fetching pilotos data:', error);
  }
};

export const fetchClasificacionConstructores = async (setClasificacionConstructores) => {
  try {
    const response = await fetch('https://ergast.com/api/f1/2024/constructorStandings.json');
    const data = await response.json();
    const standings = data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings;
    setClasificacionConstructores(standings);
  } catch (error) {
    console.error('Error fetching constructores data:', error);
  }
};

// Funciones de /c:/Users/Pcstore/OneDrive/Documentos/mclaren/mclaren/frontend/src/paginas/Empleados/empleados.jsx
export const fetchEmpleados = async (setData) => {
  try {
    const response = await fetch("http://127.0.0.1:8000/api/usuarios/");
    if (response.ok) {
      const empleados = await response.json();
      const formattedData = empleados.map((empleado) => [
        empleado.nombre,
        empleado.apellido,
        empleado.legajo,
        empleado.departamento,
      ]);
      setData(formattedData);
    } else {
      console.error("Error al obtener los empleados:", response.statusText);
    }
  } catch (error) {
    console.error("Error al conectar con el servidor:", error);
  }
};

// Funciones de /c:/Users/Pcstore/OneDrive/Documentos/mclaren/mclaren/frontend/src/paginas/Carreras/carta.jsx
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
  try {
    const response = await fetch(``);
    if (!response.ok) {
      throw new Error("Error fetching telemetria data");
    }
    const data = await response.json();
    const telemetriaNorris = data.MRData.RaceTable.Races[0].Laps.map(lap => ({ vuelta: lap.number, tiempo: lap.Timings[0].time }));
    const telemetriaPiastri = data.MRData.RaceTable.Races[0].Laps.map(lap => ({ vuelta: lap.number, tiempo: lap.Timings[1].time }));
    setSelectedCircuito({ ...circuito, telemetriaNorris, telemetriaPiastri });
  } catch (error) {
    console.error("Error fetching telemetria data:", error);
    alert("Error fetching telemetria data. Please try again later.");
  }
};

// Funciones de /c:/Users/Pcstore/OneDrive/Documentos/mclaren/mclaren/frontend/src/paginas/Carreras/carreras.jsx


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
  if (!pistaNombre) {
    alert("Por favor, selecciona una pista");
    return;
  }

  if (!Array.isArray(pistas) || !Array.isArray(estrategias) || !pistas || !estrategias || pistas.length === 0) {
    alert("Error al cargar pistas o estrategias");
    return;
  }

  const pistaSeleccionada = pistas.find(p => p.nombre === pistaNombre);
  const estrategiaSeleccionada = estrategias.find(e => e.nombre === estrategiaNombre);

  if (!pistaSeleccionada || !estrategiaSeleccionada) {
    alert("Pista o estrategia no encontrada");
    return;
  }

  try {
    const pilotos = ["norris", "piastri"];
    let telemetriaNorris = [];
    let telemetriaPiastri = [];

    const responses = await Promise.all(
      pilotos.map(piloto =>
        fetch(`http://ergast.com/api/f1/2024/5/drivers/${piloto}/laps?limit=100&offset=0`)
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

      const vueltasDisponibles = laps.length;
      cantVueltas = Math.min(cantVueltas, vueltasDisponibles);

      const telemetria = laps.slice(0, cantVueltas).map(lap => {
        const lapNumber = lap.getAttribute("number");
        const timing = lap.getElementsByTagName("Timing")[0];
        return {
          vuelta: lapNumber,
          tiempo: timing ? timing.getAttribute("time") : "N/A"
        };
      });

      if (pilotos[i] === "norris") {
        telemetriaNorris = telemetria;
      } else if (pilotos[i] === "piastri") {
        telemetriaPiastri = telemetria;
      }
    }

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

    // 1. Crear la carrera
    const formData = new FormData();
    formData.append("anio", anio);
    formData.append("pista", pistaSeleccionada.id);
    formData.append("cantVueltas", cantVueltas);
    formData.append("estrategia", estrategiaSeleccionada.id);
    formData.append("imagen", imagenArchivo);

    const responseCarrera = await fetch("http://localhost:8000/api/carreras/", {
      method: "POST",
      body: formData
    });

    if (!responseCarrera.ok) {
      const errorResponse = await responseCarrera.json();
      console.error("Error al guardar la carrera:", errorResponse);
      alert(`Error al guardar la carrera: ${JSON.stringify(errorResponse)}`);
      return;
    }

    const dataCarrera = await responseCarrera.json();

    const carreraId = dataCarrera.id;

    // 2. Crear telemetrías
    let telemetriaIds = {};
    for (const piloto of pilotos) {
      const responseTelemetria = await fetch("http://localhost:8000/api/telemetrias/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ carrera: carreraId })
      });

      if (!responseTelemetria.ok) {
        const errorTelemetria = await responseTelemetria.json();
        console.error(`Error al guardar la telemetría de ${piloto}:`, errorTelemetria);
        alert(`Error al guardar la telemetría de ${piloto}: ${JSON.stringify(errorTelemetria)}`);
        return;
      }

      const dataTelemetria = await responseTelemetria.json();
      telemetriaIds[piloto] = dataTelemetria.id;
    }

    // 3. Obtener IDs de las telemetrías creadas
    const responseGetTelemetrias = await fetch(`http://localhost:8000/api/telemetrias/?carrera=${carreraId}`);
    if (!responseGetTelemetrias.ok) {
      console.error("Error al obtener telemetrías");
      return;
    }
    const telemetrias = await responseGetTelemetrias.json();

    telemetrias.forEach(t => {
      if (t.piloto === "norris") telemetriaIds["norris"] = t.id;
      if (t.piloto === "piastri") telemetriaIds["piastri"] = t.id;
    });

    // 4. Guardar registros de vueltas
    const registros = [];
    ["norris", "piastri"].forEach(piloto => {
      const telemetriaId = telemetriaIds[piloto];
      if (!telemetriaId) {
        console.warn(`No se encontró ID de telemetría para ${piloto}`);
        return;
      }

      const telemetria = piloto === "norris" ? telemetriaNorris : telemetriaPiastri;
      telemetria.forEach(({ vuelta, tiempo }) => {
        registros.push({
          numVuelta: vuelta,
          valor: tiempo,
          telemetria: telemetriaId
        });
      });
    });

    const registrosRequests = registros.map(registro =>
      fetch("http://localhost:8000/api/registros/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(registro)
      })
    );

    await Promise.all(registrosRequests);

    // Actualizar estado y cerrar modal
    setCarreras([...carreras, { id: carreraId, ...dataCarrera }]);
    localStorage.setItem("carreras", JSON.stringify([...carreras, { id: carreraId, ...dataCarrera }]));
    handleClose();

  } catch (error) {
    console.error("Error en el proceso de carga:", error);
    alert(`Hubo un error: ${error.message}`);
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



