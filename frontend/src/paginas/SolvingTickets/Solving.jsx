import React, { useState, useEffect } from "react";
import Bar from "../Bar/Bar";
import "./Solving.css";
import Soporte from "./ModalAlta";
import SoporteRespuesta from "./ModalRespuesta";
import MuiDatatable from "mui-datatables";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Checkbox } from "@mui/material";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";

function ListadoTickets() {
  const darkTheme = createTheme({
    palette: { mode: "dark" },
    typography: { fontFamily: "noto sans, sans-serif" },
    components: {
      MuiPaper: { styleOverrides: { root: { backgroundColor: "#121212", color: "#ffffff", borderRadius: "8px" } } },
      MuiTableCell: { styleOverrides: { root: { color: "#ffffff", borderBottom: "1px solid #333" } } },
      MuiToolbar: { styleOverrides: { root: { backgroundColor: "#1f1f1f", color: "#ffffff" } } },
    },
  });

  const [data, setData] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [showModal, setShowModal] = useState({ alta: false, respuesta: false });

  useEffect(() => {
    localStorage.getItem("userLegajo");
    localStorage.getItem("userName");
    localStorage.getItem("userDepartment");
    console.log(localStorage.getItem("user"))
    console.log(localStorage.getItem("usuario"))
    const usuario = JSON.parse(localStorage.getItem("user"));
    try{
      const usuarioDNI = usuario.dni;
      console.log("DNI del usuario:", usuarioDNI);

      fetch(`https://mclaren-production.up.railway.app/solvingtickets?Usuario_DNI=${usuarioDNI}`)
        .then(response => response.json())
        .then(data => {
          console.log("Data:", data);
          if (data && data.tickets) {
            setData(data.tickets);
          } else {
            console.error("No se encontraron tickets para el usuario.");
          }
        })
        .catch(error => console.error("Error al obtener los tickets:", error));
    }
    catch{
      console.error("Error al obtener el DNI del usuario.");
    }
  }, []);

  const handleCheckboxChange = async (index) => {
    const updatedTickets = [...data];
    const ticket = updatedTickets[index];
    const nuevoEstado = ticket.Estado ? "P" : "C";
    ticket.Estado = !ticket.Estado;
    setData(updatedTickets);

    await fetch(`https://mclaren-production.up.railway.app/solvingtickets/${ticket.id}/`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ Estado: nuevoEstado }),
    });
  };

  const handleRespondButtonClick = (rowData) => {
    setSelectedTicket(rowData);
    setShowModal({ alta: false, respuesta: true });
  };

  const handleNewTicket = (nuevoTicket) => {
    setData([...data, nuevoTicket]);
    setShowModal({ alta: false, respuesta: false });
  };

  const handleAddResponse = async (newResponse) => {
    const updatedTickets = [...data];
    const ticketIndex = updatedTickets.findIndex(ticket => ticket.id === selectedTicket.id);
    updatedTickets[ticketIndex].Respuesta.push(newResponse);
    setData(updatedTickets);

    await fetch(`https://mclaren-production.up.railway.app/solvingtickets/${selectedTicket.id}/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ respuesta: newResponse }),
    });
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
          <Button className="Ticket" size="lg" onClick={() => setShowModal({ alta: true, respuesta: false })}>
            Escribir Ticket
          </Button>
        </div>
        <div className="ListadoTickets">
          <div className="tablaContainer">
            <MuiDatatable
              title="Listado de tickets"
              columns={[
                { name: "Asunto" },
                { name: "Prioridad" },
                {
                  name: "Resuelto",
                  options: {
                    customBodyRender: (value, tableMeta) => (
                      <Checkbox checked={value} onChange={() => handleCheckboxChange(tableMeta.rowIndex)} color="primary" />
                    ),
                  },
                },
                {
                  name: "Información",
                  options: {
                    customBodyRender: (_, tableMeta) => (
                      <Button color="primary" onClick={() => handleRespondButtonClick(data[tableMeta.rowIndex])}>
                        Ver Mensaje
                      </Button>
                    ),
                  },
                },
              ]}
              data={data}
              options={options}
            />
          </div>
        </div>
        <Soporte show={showModal.alta} handleClose={() => setShowModal({ alta: false, respuesta: false })} onCreate={handleNewTicket} />
        <SoporteRespuesta
          show={showModal.respuesta}
          handleClose={() => setShowModal({ alta: false, respuesta: false })}
          asunto={selectedTicket?.Asunto || ""}
          prioridad={selectedTicket?.Prioridad || ""}
          respuestas={selectedTicket?.Respuesta || []}
          onAddResponse={handleAddResponse}
        />
      </div>
    </ThemeProvider>
  );
}

export default ListadoTickets;
