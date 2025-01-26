import React, { useState, useEffect } from 'react';
import './AltaEmpleados.css';
import Bar from '../../Bar/Bar';
import MuiDatatable from 'mui-datatables';
import { ThemeProvider, createTheme } from '@mui/material/styles';

function ListadoLugar() {
  const columns = [
    { name: "Nombre", options: { setCellProps: () => ({ style: { paddingLeft: '40px' } }) } },
    { name: "Profesion", options: { setCellProps: () => ({ style: { paddingLeft: '40px' } }) } },
    { name: "Experiencia", options: { setCellProps: () => ({ style: { paddingLeft: '40px' } }) } },
    { name: "Valoracion", options: { setCellProps: () => ({ style: { paddingLeft: '40px' } }) } },
  ];
  
  const [data, setData] = useState([]);

  // Obtener los datos de la API
  useEffect(() => {
    const fetchLugares = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/lugares/');
        if (response.ok) {
          const lugares = await response.json();
          // Transformar los datos para la tabla
          const formattedData = lugares.map((Empleado) => [
            Empleado.nombre,
            Empleado.Apellido,
            Empleado.Legajo,
            Empleado.Departamento,
          ]);
          setData(formattedData);
        } else {
          console.error('Error al obtener los lugares:', response.statusText);
        }
      } catch (error) {
        console.error('Error al conectar con el servidor:', error);
      }
    };

    fetchLugares();
  }, []);

  // Crear un tema oscuro personalizado
  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
    components: {
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundColor: 'rgba(18, 18, 18, 0.8)', // Fondo semitransparente
            color: '#ffffff',
            border: '1px solid rgba(255, 255, 255, 0.2)', // Borde claro y sutil
            borderRadius: '8px', // Bordes redondeados opcionales
          },
        },
      },
      MuiTableCell: {
        styleOverrides: {
          root: {
            color: '#ffffff',
            borderBottom: '1px solid #333',
          },
        },
      },
      MuiToolbar: {
        styleOverrides: {
          root: {
            backgroundColor: '#1f1f1f',
            color: '#ffffff',
          },
        },
      },
    },
  });
  

  // Opciones de la tabla
  const options = {
    selectableRows: 'none', // Desactiva la selección de filas
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
      <div className="cuerpoAltaEmpleado">
        <Bar />
        <div className="Listado">
          <MuiDatatable
            title="Listado de Empleados JellyJobs"
            columns={columns}
            data={data}
            options={options} // Agrega las opciones aquí
          />
        </div>
      </div>
    </ThemeProvider>
  );
}

export default ListadoLugar;