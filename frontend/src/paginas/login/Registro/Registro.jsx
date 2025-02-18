import React, { useState } from "react";
import "./Registro.css";
import Registro from "../../Imagenes/Registro.jpeg";
import { Link } from "react-router-dom";

export default function Empleados() {
  const [legajo, setLegajo] = useState(""); // Almacena el legajo ingresado
  const [isPopupVisible, setIsPopupVisible] = useState(true); // Controla la visibilidad del popup
  const [nombre, setNombre] = useState(""); // Almacena el nombre del usuario
  const [apellido, setApellido] = useState(""); // Almacena el apellido del usuario
  const [departamento, setDepartamento] = useState(""); // Almacena el departamento del usuario
  const [dni, setDni] = useState(""); // Almacena el DNI del usuario

  // Verificar el legajo
  const handleLegajoSubmit = async (e) => {
    e.preventDefault();
    if (legajo.trim() !== "") {
      try {
        const response = await fetch("http://127.0.0.1:8000/verificar-legajo/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ legajo }),
        });

        const data = await response.json();
        if (data.status === "success") {
          setNombre(data.nombre); // Asigna el nombre recibido
          setApellido(data.apellido); // Asigna el apellido recibido
          setDepartamento(data.departamento); // Asigna el departamento recibido
          setIsPopupVisible(false); // Oculta el popup si el legajo es válido
        } else {
          alert(data.message);
        }
      } catch (error) {
        console.error("Error al verificar el legajo:", error);
        alert("Ocurrió un error al verificar el legajo.");
      }
    }
  };

  // Registrar el usuario
  const handleRegistroSubmit = async (e) => {
    e.preventDefault();
    const contrasenia = document.getElementById("contrasena").value;
    const repetirContrasenia = document.getElementById("repetir-contrasena").value;

    if (contrasenia !== repetirContrasenia) {
      alert("Las contraseñas no coinciden.");
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:8000/registrar-usuario/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          legajo,
          nombre,
          apellido,
          departamento,
          dni, // Enviar el DNI al backend
          contrasenia,
        }),
      });

      const data = await response.json();
      if (data.status === "success") {
        alert(data.message);
        // Redirigir o limpiar el formulario (opcional)
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Error al registrar usuario:", error);
      alert("Ocurrió un error al registrar el usuario.");
    }
  };

  return (
    <div className="TodoRegistro">
      {/* Popup */}
      {isPopupVisible && (
        <div className="popup-overlay">
          <div className="popup">
            <h2>Ingresar Legajo</h2>
            <form onSubmit={handleLegajoSubmit}>
              <input
                type="text"
                placeholder="Legajo"
                value={legajo}
                onChange={(e) => setLegajo(e.target.value)}
                required
              />
              <button type="submit" className="popup-btn">
                Aceptar
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Fondo */}
      <img className="FotoRegistro" src={Registro} alt="Fondo" />

      {/* Formulario */}
      {!isPopupVisible && (
        <div className="form-container">
          <h1 className="tituloRegistro">Crear Cuenta</h1>
          <form onSubmit={handleRegistroSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="nombre">Nombre</label>
                <input
                  type="text"
                  id="nombre"
                  name="nombre"
                  value={nombre}
                  readOnly
                />
              </div>
              <div className="form-group">
                <label htmlFor="apellido">Apellido</label>
                <input
                  type="text"
                  id="apellido"
                  name="apellido"
                  value={apellido}
                  readOnly
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="legajo">Legajo</label>
                <input
                  type="text"
                  id="legajo"
                  name="legajo"
                  value={legajo}
                  readOnly
                />
              </div>
              <div className="form-group">
                <label htmlFor="departamento">Departamento</label>
                <input
                  type="text"
                  id="departamento"
                  name="departamento"
                  value={departamento}
                  readOnly
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="dni">DNI</label>
                <input
                  type="text"
                  id="dni"
                  name="dni"
                  value={dni}
                  onChange={(e) => setDni(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="contrasena">Contraseña</label>
                <input
                  type="password"
                  id="contrasena"
                  name="contrasena"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="repetir-contrasena">Repetir Contraseña</label>
                <input
                  type="password"
                  id="repetir-contrasena"
                  name="repetir-contrasena"
                  required
                />
              </div>
            </div>

            <div className="form-actions">
              <Link to="/">
                <button type="button" className="cancel-btn">
                  Cancelar
                </button>
              </Link>
              <button type="submit" className="submit-btn">
                Crear Cuenta
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
