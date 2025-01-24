import React, { useState } from "react";
import "./Registro.css";
import Registro from "/Users/Maurinho/Documents/Mclaren/mclaren/frontend/src/paginas/Imagenes/Registro.jpeg";
import { Link } from 'react-router-dom';
export default function Empleados() {
  const [legajo, setLegajo] = useState(""); // Almacena el legajo ingresado
  const [isPopupVisible, setIsPopupVisible] = useState(true); // Controla la visibilidad del popup

  const handleLegajoSubmit = (e) => {
    e.preventDefault();
    if (legajo.trim() !== "") {
      setIsPopupVisible(false); // Oculta el popup si el legajo es válido
    }
  };

  return (
    <div className="TodoRegistro">
      {/* Popup */}
      {isPopupVisible && (
        <div className="popup-overlay">
          <div className="popup">
            <h2>Ingrese su Legajo</h2>
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
          <form>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="nombre">Nombre y Apellido</label>
                <input type="text" id="nombre" name="nombre" required />
              </div>
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
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="dni">DNI</label>
                <input type="text" id="dni" name="dni" required />
              </div>
              <div className="form-group">
                <label htmlFor="rol">Rol</label>
                <input type="text" id="rol" name="rol" required />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="usuario">Usuario</label>
              <input type="text" id="usuario" name="usuario" required />
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
              <Link to="/"><button type="button" className="cancel-btn">
                Cancelar
              </button></Link>
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
