import React, { useState, useEffect } from "react";
import "./AltaEmpleados.css";
import Bar from "../../Bar/Bar";
import MuiDatatable from "mui-datatables";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Button from "react-bootstrap/Button";
import ModalEmpleado from "./ModalEmpleado"; 

function AltaEmpleados() {
  const columns = [
    { name: "Nombre", options: { setCellProps: () => ({ style: { paddingLeft: "40px" } }) } },
    { name: "Apellido", options: { setCellProps: () => ({ style: { paddingLeft: "40px" } }) } },
    { name: "Profesión", options: { setCellProps: () => ({ style: { paddingLeft: "40px" } }) } },
    {
      name: "Contratar",
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
  const [profesiones, setProfesiones] = useState([]);
  const [showModal, setShowModal] = useState(false); 
  const [empleadoSeleccionado, setEmpleadoSeleccionado] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const empleadosResponse = await fetch("http://127.0.0.1:8001/app/interaccion/");
        const empleados = empleadosResponse.ok ? await empleadosResponse.json() : [];

        const profesionesResponse = await fetch("http://127.0.0.1:8001/app/profesionlista/");
        const profesionesData = profesionesResponse.ok ? await profesionesResponse.json() : [];

        const profesionesMap = profesionesData.reduce((acc, profesion) => {
          acc[profesion.idprofesion] = profesion.nombre;
          return acc;
        }, {});

        const formattedData = empleados.map((empleado) => [
          empleado.nombre,
          empleado.apellido,
          profesionesMap[empleado.idprofesion] || "Sin profesión",
          "Contratar", 
        ]);

        setData(formattedData);
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    };

    fetchData();
  }, []);

  const handleShowModal = (rowIndex) => {
    const empleado = data[rowIndex]; 
    setEmpleadoSeleccionado({
      nombre: empleado[0],
      apellido: empleado[1],
      profesion: empleado[2],
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
