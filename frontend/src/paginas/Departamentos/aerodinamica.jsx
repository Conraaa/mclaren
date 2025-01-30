import React, { useState, useEffect } from "react";
import Bar from "../Bar/Bar";
import "./listados.css";
import MuiDatatable from "mui-datatables";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Modal, Button, TextField, Select, MenuItem, Box, InputLabel, FormControl } from "@mui/material";

function ListadoPiezas() {
  const API_URL = "http://127.0.0.1:8000/api/piezas/";
  const CATEGORY_URL = "http://127.0.0.1:8000/lista_categoria/";
  const [data, setData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [editedData, setEditedData] = useState({ id: null, Nombre: "", Categoria: "" });
  const [categories, setCategories] = useState([]);
  const [departmentId] = useState(1); // Aquí estableces el ID del departamento

  useEffect(() => {
    fetchData();
    fetchCategories();
  }, [departmentId]);

  const fetchData = async () => {
    try {
      const response = await fetch(`${API_URL}?departamento_id=${1}`);
      if (response.ok) {
        const piezas = await response.json();
        console.log("Piezas recibidas:", piezas);

        const formattedData = piezas.map((pieza) => [
          pieza.id,
          pieza.nombre,
          pieza.categoria_nombre || "Sin categoría",
        ]);
        setData(formattedData);
      } else {
        console.error("Error al obtener las piezas:", response.statusText);
      }
    } catch (error) {
      console.error("Error al conectar con la API:", error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch(`${CATEGORY_URL}?departamento_id=${1}`);
      if (response.ok) {
        const categories = await response.json();
        console.log("Categorías recibidas:", categories);
        setCategories(categories);
      } else {
        console.error("Error al obtener las categorías:", response.statusText);
      }
    } catch (error) {
      console.error("Error al conectar con la API de categorías:", error);
    }
  };

  const handleSaveChanges = async () => {
    const pieza = {
      nombre: editedData.Nombre,
      categoria: editedData.Categoria,
    };

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

  const handleDeleteRow = async (rowIndex) => {
    const piezaId = data[rowIndex][0];
    try {
      await fetch(`${API_URL}${piezaId}/`, { method: "DELETE" });
      fetchData();
    } catch (error) {
      console.error("Error al eliminar la pieza:", error);
    }
  };

  const handleEditRow = (rowIndex) => {
    setSelectedRow(rowIndex);
    const pieza = data[rowIndex];

    const selectedCategoryId = pieza[2] === "Sin categoría" ? null : pieza[2];

    setEditedData({
      id: pieza[0],
      Nombre: pieza[1],
      Categoria: selectedCategoryId,
    });
    setIsModalOpen(true);
  };

  const darkTheme = createTheme({
    palette: { mode: "dark" },
    components: {
      MuiPaper: { styleOverrides: { root: { backgroundColor: "rgba(18, 18, 18, 0.8)", color: "#ffffff", borderRadius: "8px" } } },
      MuiTableCell: { styleOverrides: { root: { color: "#ffffff", borderBottom: "1px solid #333" } } },
      MuiToolbar: { styleOverrides: { root: { backgroundColor: "#1f1f1f", color: "#ffffff" } } },
    },
  });

  const options = {
    selectableRows: "none",
    textLabels: {
      body: { noMatch: "No se encontraron registros", toolTip: "Ordenar" },
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
                  customBodyRender: (_, tableMeta) => (
                    <>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleEditRow(tableMeta.rowIndex)}
                        style={{ marginRight: "8px" }}
                      >
                        Editar
                      </Button>
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => handleDeleteRow(tableMeta.rowIndex)}
                      >
                        Eliminar
                      </Button>
                    </>
                  ),
                },
              },
            ]}
            data={data}
            options={options}
          />
          <div className="altaPieza">
            <Button onClick={() => setIsModalOpen(true)} variant="contained" color="primary">
              Agregar pieza
            </Button>
          </div>
        </div>

        <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <Box sx={{
            position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)",
            width: 400, bgcolor: "background.paper", boxShadow: 24, p: 4, borderRadius: 2
          }}>
            <h2 className="TituloCRUD">{selectedRow !== null ? "Editar Pieza" : "Agregar Pieza"}</h2>
            <TextField fullWidth margin="normal" label="Nombre" value={editedData.Nombre}
              onChange={(e) => setEditedData({ ...editedData, Nombre: e.target.value })} />
            <FormControl fullWidth margin="normal">
              <InputLabel>Categoría</InputLabel>
              <Select
                value={editedData.Categoria}
                onChange={(e) => setEditedData({ ...editedData, Categoria: e.target.value })}
              >
                {categories.length > 0 ? (
                  categories.map((category) => (
                    <MenuItem key={category.id} value={category.id}>
                      {category.nombre}
                    </MenuItem>
                  ))
                ) : (
                  <MenuItem disabled>Cargando categorías...</MenuItem>
                )}
              </Select>
            </FormControl>
            <Button variant="contained" color="primary" onClick={handleSaveChanges} style={{ marginTop: "10px" }}>
              {selectedRow !== null ? "Guardar Cambios" : "Agregar"}
            </Button>
          </Box>
        </Modal>
      </div>
    </ThemeProvider>
  );
}

export default ListadoPiezas;
