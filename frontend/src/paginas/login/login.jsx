import React, { useState } from 'react';
import lock from '../Imagenes/Lock.png';
import USER from '../Imagenes/USER.png';
import video from '../Videos/mclarenf1.mp4';
import ReactPlayer from 'react-player';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import './login.css';

function App() {
  const [legajo, setLegajo] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!legajo || !contraseña) {
      setError('Por favor, completa todos los campos.');
      return;
    }

    setLoading(true);
    setError('');
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/login/', {
        legajo,
        contrasenia: contraseña,
      });
      // Guardar tokens y datos en localStorage
      localStorage.setItem('accessToken', response.data.access);
      localStorage.setItem('refreshToken', response.data.refresh);
      localStorage.setItem('userLegajo', response.data.legajo);
      localStorage.setItem('userName', response.data.nombre);
      localStorage.setItem('userDepartment', response.data.departamento);

      // Navegar de vuelta a la página previa o al home si no hay una previa
      const previousPath = location.state?.from || '/';
      navigate(previousPath);
    } catch (err) {
      if (err.response && err.response.data) {
        setError(err.response.data.detail || 'Error al iniciar sesión.');
      } else {
        setError('Error de conexión con el servidor. Intenta nuevamente.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="Envoltura">
      <div className="video">
        <ReactPlayer className="video1" url={video} muted playing loop />
      </div>
      <div className="Envoltura2">
        <form className="Formulario" onSubmit={handleLogin}>
          <h1>Log in</h1>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <div className="log_caja">
            <input
              type="text"
              placeholder="Legajo"
              value={legajo}
              onChange={(e) => setLegajo(e.target.value)}
              required
            />
            <img className="ImagenLog" src={USER} alt="Imagen de usuario" />
          </div>
          <div className="log_caja">
            <input
              type="password"
              placeholder="Contraseña"
              value={contraseña}
              onChange={(e) => setContraseña(e.target.value)}
              required
            />
            <img className="ImagenLog" src={lock} alt="Imagen de Seguro" />
          </div>
          <button className="Boton" type="submit" disabled={loading}>
            {loading ? 'Cargando...' : 'Log in'}
          </button>
        </form>
        <div className="registro">
          <Link to="/Registro">
            <button className="Boton">Iniciar registro</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default App;
