import React, { useEffect, useState } from 'react';
import './Bar.css';
import './intro/Intro.css';
import Logo from '../Imagenes/Logo.png';
import UsuarioBar from '../Imagenes/UsuarioBar.png';
import Logocentral from '../Imagenes/Logo_Central.png';
import { Link } from 'react-router-dom';
import Intro from './intro/Intro';

export default function BarBar() {
  const [userName, setUserName] = useState('');
  const [userDepartment, setUserDepartment] = useState('');
  const [userLegajo, setUserLegajo] = useState('');
  const [introFinished, setIntroFinished] = useState(false);      //Controla si el video de introducción terminó
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    // Obtener los datos del usuario desde localStorage
    const storedName = localStorage.getItem('userName');
    const storedDepartment = localStorage.getItem('userDepartment');
    const storedLegajo = localStorage.getItem('userLegajo');

    // Actualizar el estado si los datos existen
    if (storedName && storedDepartment && storedLegajo) {
      setUserName(storedName);
      setUserDepartment(storedDepartment);
      setUserLegajo(storedLegajo);
    }
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = (e) => {
    if (e.target.classList.contains('menuBackground')) {
      setMenuOpen(false);
    }
  };

  return (
    <>
      {/* Clip de introducción */}
      {!introFinished && <Intro onFinish={() => setIntroFinished(true)} />}
  
      {/* Contenido principal, siempre cargándose */}
      <div className={`barBar ${!introFinished ? 'hidden-content' : ''}`}>
        <div className="logoMenúBar">
          <nav>
            <ul className="menuHorizontalBar">
              <li>
                <Link onClick={toggleMenu}>
                  <img className="LogoBar" src={Logo} alt="logo de la pagina" />
                </Link>
                <ul className="menuVerticalBar">
                  <li><Link to="/"><button><b>Home</b></button></Link></li>
                  <li><Link to="/Empleados"><button><b>Empleados</b></button></Link></li>
                  <li><Link to="/Carreras"><button><b>Carreras</b></button></Link></li>
                  <li><Link to="/Pistas"><button><b>Pistas</b></button></Link></li>
                  <li><Link to="/ListadoEstrategia"><button><b>Estrategia</b></button></Link></li>
                  <li><Link to="/Departamentos"><button><b>Departamento</b></button></Link></li>
                  <li><Link to="/Soporte"><button><b>Soporte</b></button></Link></li>
                </ul>
              </li>
            </ul>
          </nav>
        </div>
  
        <Link to="/">
          <img className="Logo_centralBar" src={Logocentral} alt="Logo de en medio" />
        </Link>
  
        {/* Menú de usuario a la derecha */}
        <div className="userMenuBar">
          {userName ? (
            <>
              <div className="userInfoBar">
                <img src={UsuarioBar} alt="Logo Usuario" />
              </div>
              <ul className="menuVerticalUserBar">
                <li><b>{userName}</b></li>
                <li><b>{userDepartment}</b></li>
                <li><b>{userLegajo}</b></li>
                <li>
                  <button className="logoutButtonBar" onClick={() => {
                    localStorage.clear();
                    window.location.reload();
                  }}>
                    Cerrar sesión
                  </button>
                </li>
              </ul>
            </>
          ) : (
            <Link to="/login">
              <button className="loginButtonBar">Iniciar sesión</button>
            </Link>
          )}

        </div>
      </div>
    </>
  );
}