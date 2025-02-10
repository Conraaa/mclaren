import React, { useState } from "react";
import Bar from "../Bar/Bar";
import "./Solving.css";
import Soporte from "./Modal"; 
import MuiDatatable from "mui-datatables";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Checkbox } from "@mui/material";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css"; 


function ListadoTickets() {
  const darkTheme = createTheme({
    palette: { mode: "dark" },
    components: {
      MuiPaper: { styleOverrides: { root: { backgroundColor: "#121212", color: "#ffffff", borderRadius: "8px" } } },
      MuiTableCell: { styleOverrides: { root: { color: "#ffffff", borderBottom: "1px solid #333" } } },
      MuiToolbar: { styleOverrides: { root: { backgroundColor: "#1f1f1f", color: "#ffffff" } } },
    },
  });

  const [data, setData] = useState([
    { Asunto: "Problema con la red", Prioridad: "Alta", Estado: false, "+Info": "Detalles", Mensaje: "La red no responde desde ayer.", Opcion: "" },
    { Asunto: "Error en la aplicación", Prioridad: "Media", Estado: true, "+Info": "Detalles", Mensaje: "Al iniciar la app, da error en la pantalla de inicio.", Opcion: "" },
    { Asunto: "Solicitud de acceso", Prioridad: "Baja", Estado: false, "+Info": "Detalles", Mensaje: "Necesito acceso a la plataforma.", Opcion: "" },
    { Asunto: "Fallo en la base de datos", Prioridad: "Alta", Estado: true, "+Info": "Detalles", Mensaje: "No se puede acceder a la base de datos, está caída.", Opcion: "" },
  ]);

  const [selectedTicket, setSelectedTicket] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleCheckboxChange = (index) => {
    const newData = [...data];
    newData[index].Estado = !newData[index].Estado;
    setData(newData);
  };

  // Función para responder a un ticket existente
  const handleRespondButtonClick = (rowData) => {
    setSelectedTicket(rowData);
    setShowModal(true);
  };

  // Función para abrir el modal de nuevo ticket
  const handleNewTicket = () => {
    setSelectedTicket(null);
    setShowModal(true);
  };

  const options = {
    selectableRows: "none",
    textLabels: {
      body: { noMatch: "No se encontraron registros", toolTip: "Ordenar", columnHeaderTooltip: (column) => `Ordenar por ${column.label}`, },
      pagination: { next: "Siguiente", previous: "Anterior", rowsPerPage: "Filas por página:", displayRows: "de" },
      toolbar: { search: "Buscar", downloadCsv: "Descargar CSV", print: "Imprimir", viewColumns: "Ver columnas", filterTable: "Filtrar" },
      filter: { all: "Todo", title: "FILTROS", reset: "REINICIAR" },
      viewColumns: { title: "Mostrar Columnas" },
      selectedRows: { text: "fila(s) seleccionadas", delete: "Eliminar" },
    },
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <div className="pantallaCompleta">
        <Bar />

        <div className="ticketButtonContainer">
          <Button  className="Ticket" size="lg" onClick={handleNewTicket}>
            Escribir Ticket
          </Button>
        </div>

        <div className="ListadoTickets">
          <div className="tablaContainer">
            <MuiDatatable
              title="Listado de Tickets"
              columns={[
                { name: "Asunto" },
                { name: "Prioridad" },
                { 
                  name: "Estado",
                  options: {
                    customBodyRender: (value, tableMeta) => (
                      <Checkbox
                        checked={value}
                        onChange={() => handleCheckboxChange(tableMeta.rowIndex)}
                        color="primary"
                      />
                    ),
                  },
                },
                { name: "Mensaje" },
                { 
                  name: "Opción", 
                  options: {
                    customBodyRender: (value, tableMeta) => (
                      <Button
                        color="primary"
                        onClick={() => handleRespondButtonClick(data[tableMeta.rowIndex])}
                      >
                        Responder
                      </Button>
                    ),
                  },
                },
                { name: "+Info" },
              ]}
              data={data}
              options={options}
            />
          </div>
        </div>

        <Soporte
          show={showModal}
          handleClose={() => setShowModal(false)}
          asunto={selectedTicket?.Asunto || ""}
          prioridad={selectedTicket?.Prioridad || ""}
          mensaje={selectedTicket?.Mensaje || ""}
          isReply={!!selectedTicket} 
        />
      </div>
    </ThemeProvider>
  );
}

export default ListadoTickets;
