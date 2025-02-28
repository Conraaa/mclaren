import React, { useState } from 'react';
import lock from '../Imagenes/Lock.png';
import USER from '../Imagenes/USER.png';
import video from '../Videos/mclarenf1.mp4';
import ReactPlayer from 'react-player';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../Context/AuthProvider';
import { message } from 'antd'; 
import './login.css';

function Login() {
  const [legajo, setLegajo] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [error] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!legajo || !contraseña) {
      message.error('Todos los campos son obligatorios'); 
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/login/', {
        legajo,
        contrasenia: contraseña,
      });
      localStorage.setItem('access', response.data.access);
      localStorage.setItem('userLegajo', response.data.legajo);
      localStorage.setItem('userName', response.data.nombre);
      localStorage.setItem('userDepartment', response.data.departamento);
      localStorage.setItem('refresh', response.data.refresh);
      login({
        legajo: response.data.legajo,
        nombre: response.data.nombre,
        departamento: response.data.departamento,
        access: response.data.access,
        refresh: response.data.refresh
      });

      message.success('Inicio de sesión exitoso'); 

      const previousPath = location.state?.from || '/';
      navigate(previousPath);
    } catch (err) {
      if (err.response && err.response.data) {
        message.error(err.response.data.detail || 'Error al iniciar sesión.'); 
      } else {
        message.error('Error de conexión con el servidor.'); 
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
