import React, { useState, useEffect } from "react";
import "./AltaEmpleados.css";
import Bar from "../../Bar/Bar";
import MuiDatatable from "mui-datatables";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Button from "react-bootstrap/Button";
import ModalEmpleado from "./ModalEmpleado"; 

function AltaEmpleados() {
  const columns = [
    { name: "nombre", label: "Nombre", options: { setCellProps: () => ({ style: { paddingLeft: "40px" } }) } },
    { name: "apellido", label: "Apellido", options: { setCellProps: () => ({ style: { paddingLeft: "40px" } }) } },
    { name: "profesion", label: "Profesión", options: { setCellProps: () => ({ style: { paddingLeft: "40px" } }) } },
    {
      name: "contratar", label: "Contratar",
      options: {
        customBodyRender: (value, tableMeta, updateData) => {
          return (
            <Button
              onClick={() => handleShowModal(tableMeta.rowIndex)} 
              variant="primary"
            >
              Contratar
            </Button>
          );
        },
      },
    },
  ];

  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false); 
  const [empleadoSeleccionado, setEmpleadoSeleccionado] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const empleadosResponse = await fetch("https://mclaren-production.up.railway.app/jellyjobs/empleados/");
        const empleadosData = empleadosResponse.ok ? await empleadosResponse.json() : {};

        if (!Array.isArray(empleadosData.empleados)) {
          console.error("La respuesta de empleados no contiene un array válido");
          setData([]);
          return;
        }

        console.log("EmpleadosData",empleadosData);

        const profesionesResponse = await fetch("https://mclaren-production.up.railway.app/jellyjobs/profesiones/");
        const profesionesData = profesionesResponse.ok ? await profesionesResponse.json() : {};
        console.log("ProfesionesData",profesionesData);

        if (!profesionesData.profesiones || !Array.isArray(profesionesData.profesiones)) {
          console.error("La respuesta de profesiones no contiene un array válido");
          return;
        }

        const profesionesMap = profesionesData.profesiones.reduce((acc, profesion) => {
          acc[profesion.idprofesion] = profesion.nombre;
          return acc;
        }, {});
        console.log("ProfesionesMap",profesionesMap);

        const formattedData = empleadosData.empleados.map((empleado) => ({
          idtrabajador: empleado.idtrabajador,
          nombre: empleado.nombre,
          apellido: empleado.apellido,
          profesion: profesionesMap[empleado.idprofesion] || "Sin profesión",
          estadotrabajo: empleado.estadotrabajo,
        }));

        setData(formattedData);
      } catch (error) {
        console.error("Error al obtener los datos:", error);
        setData([]);
      }
    };

    fetchData();
  }, []);

  const handleShowModal = (rowIndex) => {
    const empleado = data[rowIndex]; 
    setEmpleadoSeleccionado({
      nombre: empleado.nombre,
      apellido: empleado.apellido,
      profesion: empleado.profesion,
      idtrabajador: empleado.idtrabajador,
    });
    setShowModal(true); 
  };

  const darkTheme = createTheme({
    palette: { mode: "dark" },
    typography: { fontFamily: "noto sans, sans-serif" },
    components: {
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundColor: "rgba(18, 18, 18, 0.8)",
            color: "#ffffff",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            borderRadius: "8px",
          },
        },
      },
      MuiTableCell: {
        styleOverrides: { root: { color: "#ffffff", borderBottom: "1px solid #333" } },
      },
      MuiToolbar: { styleOverrides: { root: { backgroundColor: "#1f1f1f", color: "#ffffff" } } },
    },
  });

  const options = {
    selectableRows: "none",
    textLabels: {
      body: { noMatch: "Lo siento, no se encontraron registros coincidentes", toolTip: "Ordenar", columnHeaderTooltip: (column) => `Ordenar por ${column.label}`, },
      pagination: { next: "Siguiente", previous: "Anterior", rowsPerPage: "Filas por página:", displayRows: "de" },
      toolbar: { search: "Buscar", downloadCsv: "Descargar CSV", print: "Imprimir", viewColumns: "Ver columnas", filterTable: "Filtrar" },
      filter: { all: "Todo", title: "FILTROS", reset: "REINICIAR" },
      viewColumns: { title: "Mostrar Columnas" },
      selectedRows: { text: "fila(s) seleccionadas", delete: "Eliminar" },
    },
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <div className="cuerpoAltaEmpleado">
        <Bar />
        <div className="Listado">
          <MuiDatatable title="Listado de Empleados JellyJobs" columns={columns} data={data} options={options} />
        </div>
      </div>

    
      <ModalEmpleado
        show={showModal}
        handleClose={() => setShowModal(false)} 
        empleadoSeleccionado={empleadoSeleccionado} 
      />
    </ThemeProvider>
  );
}

export default AltaEmpleados;
