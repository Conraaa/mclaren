import React, { useState } from 'react';
import lock from '../Imagenes/Lock.png';
import USER from '../Imagenes/USER.png';
import video from '../Videos/mclarenf1.mp4';
import ReactPlayer from 'react-player';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../Context/AuthProvider';
import './login.css';

function Login() {
  const [legajo, setLegajo] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

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
      console.log('accessToken', response.data.access);
      // Establecer el usuario en el contexto
      login({
        legajo: response.data.legajo,
        nombre: response.data.nombre,
        departamento: response.data.departamento,
      });

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
          <h1>Ingresar</h1>
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
            {loading ? 'Cargando...' : 'Iniciar sesión'}
          </button>
        </form>
        <div className="registro">
          <Link to="/Registro">
            <button className="Boton">Registrarse</button>
          </Link>
          <Link to="/">
            <button className="BotonVolverHome">Volver al Home</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
