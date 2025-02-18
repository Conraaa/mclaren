import React, { useState, useEffect } from "react";
import "./empleados.css";
import Bar from "../Bar/Bar.jsx";
import MuiDatatable from "mui-datatables";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Link } from "react-router-dom";
import { fetchEmpleados } from '../Funciones.js';

function ListadoLugar() {
  const columns = [
    { name: "Nombre", options: { setCellProps: () => ({ style: { paddingLeft: "40px" } }) } },
    { name: "Apellido", options: { setCellProps: () => ({ style: { paddingLeft: "40px" } }) } },
    { name: "Legajo", options: { setCellProps: () => ({ style: { paddingLeft: "40px" } }) } },
    { name: "Departamento", options: { setCellProps: () => ({ style: { paddingLeft: "40px" } }) } },
  ];

  const [data, setData] = useState([]);

  // Obtener los datos de la API
  useEffect(() => {
    fetchEmpleados(setData);
  }, []);

  // Crear un tema oscuro personalizado
  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
    typography: {
      fontFamily: 'noto sans, sans-serif', // Cambia la fuente aquí
    },
    components: {
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundColor: "rgba(18, 18, 18, 0.8)", // Fondo semitransparente
            color: "#ffffff",
            border: "1px solid rgba(255, 255, 255, 0.2)", // Borde claro y sutil
            borderRadius: "8px", // Bordes redondeados opcionales
          },
        },
      },
      MuiTableCell: {
        styleOverrides: {
          root: {
            color: "#ffffff",
            borderBottom: "1px solid #333",
          },
        },
      },
      MuiToolbar: {
        styleOverrides: {
          root: {
            backgroundColor: "#1f1f1f",
            color: "#ffffff",
          },
        },
      },
    },
  });

  // Opciones de la tabla
  const options = {
    selectableRows: "none", // Desactiva la selección de filas
    delete: false, // Desactiva la opción de eliminar
    textLabels: {
      body: {
        noMatch: "Lo siento, no se encontraron registros coincidentes",
        toolTip: "Ordenar",
        columnHeaderTooltip: (column) => `Ordenar por ${column.label}`,
      },
      pagination: {
        next: "Siguiente página",
        previous: "Página anterior",
        rowsPerPage: "Filas por página:",
        displayRows: "de",
      },
      toolbar: {
        search: "Buscar",
        downloadCsv: "Descargar CSV",
        print: "Imprimir",
        viewColumns: "Ver columnas",
        filterTable: "Filtrar tabla",
      },
      filter: {
        all: "Todo",
        title: "FILTROS",
        reset: "REINICIAR",
      },
      viewColumns: {
        title: "Mostrar Columnas",
        titleAria: "Mostrar/Ocultar Columnas",
      },
      selectedRows: {
        text: "fila(s) seleccionadas",
        delete: "Eliminar",
        deleteAria: "Eliminar filas seleccionadas",
      },
    },
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <div className="cuerpoEmpleados">
        <Bar />
        <div className="Listado">
          <MuiDatatable
            title="Listado de Empleados"
            columns={columns}
            data={data}
            options={options}
          />
          <div className="altaEmpleado">
            <Link to="/AltaEmpleados">
              <button>Contratar Empleados</button>
            </Link>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default ListadoLugar;
