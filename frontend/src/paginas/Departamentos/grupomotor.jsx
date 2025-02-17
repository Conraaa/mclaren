import React, { useState, useEffect } from "react";
import Bar from "../Bar/Bar";
import "./listados.css";
import MuiDatatable from "mui-datatables";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, Form, FormControl, Button } from "react-bootstrap";

function ListadoPiezas() {
  const API_URL = "http://127.0.0.1:8000/api/piezas/";
  const CATEGORY_URL = "http://127.0.0.1:8000/lista_categoria/";
  const [data, setData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [editedData, setEditedData] = useState({ id: null, Nombre: "", Categoria: "" });
  const [categories, setCategories] = useState([]);
  const [departmentId] = useState(2);

  useEffect(() => {
    fetchData();
    fetchCategories();
  }, [departmentId]);

  const fetchData = async () => {
    try {
      const response = await fetch(`${API_URL}?departamento_id=${2}`);
      if (response.ok) {
        setData(await response.json());
      }
    } catch (error) {
      console.error("Error al conectar con la API:", error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch(`${CATEGORY_URL}?departamento_id=${2}`);
      if (response.ok) {
        setCategories(await response.json());
      }
    } catch (error) {
      console.error("Error al conectar con la API de categorías:", error);
    }
  };

  const handleSaveChanges = async () => {
    const pieza = { nombre: editedData.Nombre, categoria: editedData.Categoria };
    try {
      if (selectedRow !== null) {
        await fetch(`${API_URL}${editedData.id}/`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(pieza),
        });
      } else {
        await fetch(API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(pieza),
        });
      }
      setIsModalOpen(false);
      fetchData();
    } catch (error) {
      console.error("Error al guardar los cambios:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`${API_URL}${id}/`, { method: "DELETE" });
      fetchData();
    } catch (error) {
      console.error("Error al eliminar la pieza:", error);
    }
  };

  const handleEdit = (id) => {
    const pieza = data.find((item) => item.id === id);
    if (pieza) {
      setEditedData({ id: pieza.id, Nombre: pieza.nombre, Categoria: pieza.categoria });
      setSelectedRow(pieza.id);
      setIsModalOpen(true);
    }
  };

  const handleAdd = () => {
    setEditedData({ id: null, Nombre: "", Categoria: "" });
    setSelectedRow(null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const darkTheme = createTheme({
    palette: { mode: "dark" },
    typography: { fontFamily: 'noto sans, sans-serif' },
    components: {
      MuiPaper: { styleOverrides: { root: { backgroundColor: "rgba(18, 18, 18, 0.8)", color: "#ffffff", borderRadius: "8px" } } },
      MuiTableCell: { styleOverrides: { root: { color: "#ffffff", borderBottom: "1px solid #333" } } },
      MuiToolbar: { styleOverrides: { root: { backgroundColor: "#1f1f1f", color: "#ffffff" } } },
    },
  });

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
      <div className="cuerpoAltaPieza">
        <Bar />
        <div className="Listado">
          <MuiDatatable
            title="Listado de piezas"
            columns={[
              { name: "ID", options: { display: "excluded" } },
              { name: "Nombre" },
              { name: "Categoría" },
              {
                name: "Opciones",
                options: {
                  customBodyRender: (_, tableMeta) => {
                    const piezaId = tableMeta.rowData[0]; // Ahora obtiene el ID correctamente
                    return (
                      <>
                        <Button className="editar" onClick={() => handleEdit(piezaId)}>Editar</Button>
                        <Button className="btn btn-danger" onClick={() => handleDelete(piezaId)}>Eliminar</Button>
                      </>
                    );
                  },
                },
              },
            ]}
            data={data.map((pieza) => [pieza.id, pieza.nombre, pieza.categoria_nombre || "Sin categoría"])}
            options={options}
          />
          <div className="altaPieza">
            <Button 
              onClick={handleAdd} 
            >
              Agregar pieza
            </Button>
          </div>
        </div>

        <Modal show={isModalOpen} onHide={handleCloseModal} className="custom-modal">
          <Modal.Header closeButton>
            <Modal.Title>{selectedRow !== null ? "Editar Pieza" : "Agregar Pieza"}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="nombre">
                <Form.Label>Nombre</Form.Label>
                <FormControl
                  type="text"
                  value={editedData.Nombre}
                  onChange={(e) => setEditedData({ ...editedData, Nombre: e.target.value })}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Categoría</Form.Label>
                <Form.Select
                  className="inputTicket"
                  value={editedData.Categoria}
                  onChange={(e) => setEditedData({ ...editedData, Categoria: e.target.value })}
                >
                  <option value="" disabled>Seleccionar una categoría</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>{category.nombre}</option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button className="Cerrar" onClick={handleCloseModal}>Cerrar</Button>
            <Button className="Guardar" onClick={handleSaveChanges}>
              {selectedRow !== null ? "Editar" : "Agregar"}
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </ThemeProvider>
  );
}

export default ListadoPiezas;
