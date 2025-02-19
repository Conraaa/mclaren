import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

function ModalEmpleado({ show, handleClose, empleadoSeleccionado }) {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [departamentos, setDepartamentos] = useState([]);
  const [departamentoSeleccionado, setDepartamentoSeleccionado] = useState("");
  const [legajo, setLegajo] = useState(1);

  useEffect(() => {
    if (empleadoSeleccionado) {
      setNombre(empleadoSeleccionado.nombre);
      setApellido(empleadoSeleccionado.apellido);
    }
  }, [empleadoSeleccionado]);

  useEffect(() => {
    if (show) {
      fetch("http://127.0.0.1:8000/api/departamentos/")
        .then((response) => response.json())
        .then((data) => {
          setDepartamentos(data);
        })
        .catch((error) => console.error("Error al obtener los departamentos:", error));

      fetch("http://127.0.0.1:8000/api/usuarios/")
        .then((response) => response.json())
        .then((data) => {
          const lastUser = data[data.length - 1];
          if (lastUser && lastUser.legajo) {
            setLegajo(lastUser.legajo + 1);
          }
        })
        .catch((error) => console.error("Error al obtener los usuarios:", error));
    }
  }, [show]);

  const handleContratar = () => {
    const departamentoNombre = departamentos.find(dep => dep.id === parseInt(departamentoSeleccionado, 10))?.nombre || "Desconocido";

    console.log("Datos del usuario:", {
      dni: null,
      nombre,
      apellido,
      legajo,
      departamento: departamentoSeleccionado,
      contrasenia: "default",
    });

    const usuario = {
      dni: null,
      nombre,
      apellido,
      legajo,
      departamento: parseInt(departamentoSeleccionado, 10),
      contrasenia: "default",
    };
    
    fetch("http://127.0.0.1:8000/api/usuarios/", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(usuario),
    })
      .then((response) => response.json())
      .then((data) => {
        alert(`Empleado contratado con el siguiente legajo: ${legajo}\nNombre: ${nombre} ${apellido}\nDepartamento: ${departamentoNombre}`);

        if (empleadoSeleccionado && empleadoSeleccionado.idtrabajador) {
          fetch(`http://127.0.0.1:9001/app/interaccion/${empleadoSeleccionado.idtrabajador}/`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ estado: "Ocupado" }),
          })
            .then((response) => {
              if (!response.ok) throw new Error("Error al actualizar estado en API externa");
              return response.json();
            })
            .then((updatedEmpleado) => {
              console.log("Empleado actualizado en API externa:", updatedEmpleado);
            })
            .catch((error) => {
              console.error("Error al actualizar el estado del empleado:", error);
              alert("Hubo un problema al actualizar el estado del empleado.");
            });
        }

        setLegajo(legajo + 1);
        handleCloseAndClearDepartamento();
      })
      .catch((error) => {
        alert("Hubo un error al contratar al empleado. Intenta nuevamente.");
      });
  };

  const handleCloseAndClearDepartamento = () => {
    setDepartamentoSeleccionado("");
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleCloseAndClearDepartamento} className="custom-modal">
      <Modal.Header closeButton>
        <Modal.Title>Detalles del Empleado</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>
          <Form.Group className="mb-empleado">
            <Form.Label>Nombre</Form.Label>
            <Form.Control type="text" value={nombre} disabled />
          </Form.Group>

          <Form.Group className="mb-empleado">
            <Form.Label>Apellido</Form.Label>
            <Form.Control type="text" value={apellido} disabled />
          </Form.Group>

          <Form.Group className="mb-empleado">
            <Form.Label>Departamento</Form.Label>
            <Form.Control 
              as="select" 
              className="inputSelector"
              value={departamentoSeleccionado} 
              onChange={(e) => setDepartamentoSeleccionado(e.target.value)}
            >
              <option value="" disabled>Seleccione un departamento</option>
              {departamentos.map((dep) => (
                <option key={dep.id} value={dep.id}>
                  {dep.nombre}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button className="Cerrar" onClick={handleCloseAndClearDepartamento}>Cerrar</Button>
        <Button className="Guardar" onClick={handleContratar}>Contratar</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalEmpleado;
