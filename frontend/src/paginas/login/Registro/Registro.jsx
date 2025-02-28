import React, { useState } from "react";
import "./Registro.css";
import Registro from "../../Imagenes/Registro.jpeg";
import { Link, useNavigate } from "react-router-dom";
import { message } from 'antd'; 

export default function Empleados() {
  const [legajo, setLegajo] = useState(""); 
  const [isPopupVisible, setIsPopupVisible] = useState(true); 
  const [nombre, setNombre] = useState(""); 
  const [apellido, setApellido] = useState(""); 
  const [departamento, setDepartamento] = useState(""); 
  const [dni, setDni] = useState(""); 
  const navigate = useNavigate();

 
  const handleLegajoSubmit = async (e) => {
    e.preventDefault();
    if (legajo.trim() !== "") {
      try {
        const response = await fetch("https://mclaren-production.up.railway.app/verificar-legajo/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ legajo }),
        });

        const data = await response.json();
        if (data.status === "success") {
          if (data.dni !== null) {
            message.error("Ese usuario ya está registrado."); 
          } else {
            setNombre(data.nombre); 
            setApellido(data.apellido); 
            setDepartamento(data.departamento); 
            setIsPopupVisible(false); 
            message.success("Legajo verificado con éxito."); 
          }
        } else {
          message.error(data.message); 
        }
      } catch (error) {
        console.error("Error al verificar el legajo:", error);
        message.error("Ocurrió un error al verificar el legajo."); 
      }
    }
  };

 
  const handleRegistroSubmit = async (e) => {
    e.preventDefault();
    const contrasenia = document.getElementById("contrasena").value;
    const repetirContrasenia = document.getElementById("repetir-contrasena").value;

    if (contrasenia !== repetirContrasenia) {
      message.error("Las contraseñas no coinciden."); 
      return;
    }

    try {
      const response = await fetch("https://mclaren-production.up.railway.app/registrar-usuario/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          legajo,
          nombre,
          apellido,
          departamento,
          dni, 
          contrasenia,
        }),
      });

      const data = await response.json();
      if (data.status === "success") {
        message.success(data.message); 
        navigate("/login");
      } else {
        message.error(data.message); 
      }
    } catch (error) {
      console.error("Error al registrar usuario:", error);
      message.error("Ocurrió un error al registrar el usuario."); 
    }
  };

  return (
    <div className="TodoRegistro">
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

            <Link to="/login">
              <button className="go-login-btn">Volver al Ingreso</button>
            </Link>
          </div>
        </div>
      )}

      
      <img className="FotoRegistro" src={Registro} alt="Fondo" />

   
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
              <Link to="/login">
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
