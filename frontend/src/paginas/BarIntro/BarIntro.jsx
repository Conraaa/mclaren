import React, { useEffect, useState } from 'react';
import './BarIntro.css';
import './intro/Intro.css';
import Logo from '../Imagenes/Logo.png';
import Logocentral from '../Imagenes/Logo_Central.png';
import { Link } from 'react-router-dom';
import Intro from './intro/Intro';

export default function Bar() {
  const [userName, setUserName] = useState('');
  const [userDepartment, setUserDepartment] = useState('');
  const [userLegajo, setUserLegajo] = useState('');
  const [introFinished, setIntroFinished] = useState(false); // Controla si el video de introducción terminó

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

  return (
    <>
      {/* Clip de introducción */}
      {!introFinished && <Intro onFinish={() => setIntroFinished(true)} />}

      {/* Contenido principal, siempre cargándose */}
      <div className={`bar ${!introFinished ? 'hidden-content' : ''}`}>
        {/* Menú principal a la izquierda */}
        <div className="logoMenú">
          <nav>
            <ul className="menuHorizontal">
              <li>
                <Link>
                  <img className="Logo" src={Logo} alt="logo de la pagina" />
                </Link>
                <ul className="menuVertical">
                  <li>
                    <Link to="/">
                      <button><b>Home</b></button>
                    </Link>
                  </li>
                  <li>
                    <Link to="/empleados">
                      <button><b>Empleados</b></button>
                    </Link>
                  </li>
                  <li>
                    <Link to="/carreras">
                      <button><b>Carreras</b></button>
                    </Link>
                  </li>
                  <li>
                    <Link to="/pistas">
                      <button><b>Pistas</b></button>
                    </Link>
                  </li>
                  <li>
                    <Link to="/ListadoEstrategia">
                      <button><b>Estrategia</b></button>
                    </Link>
                  </li>
                  <li>
                    <Link to="/Departamentos">
                      <button><b>Departamento</b></button>
                    </Link>
                  </li>
                  <li>
                    <Link to="/Solving">
                      <button><b>Solving Tickets</b></button>
                    </Link>
                  </li>
                </ul>
              </li>
            </ul>
          </nav>
        </div>

        {/* Logo central */}
        <Link to="/">
          <img className="Logo_central" src={Logocentral} alt="Logo de en medio" />
        </Link>

        {/* Menú de usuario a la derecha */}
        <div className="userMenu">
          {userName ? (
            <>
              <div className="userInfo">
                <p className="user">{`${userName} - ${userDepartment}`}</p>
              </div>
              <ul className="menuVerticalUser">
                <li><b>{userName}</b></li>
                <li><b>{userDepartment}</b></li>
                <li><b>{userLegajo}</b></li>
                <li>
                  <button className="logoutButton" onClick={() => {
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
              <button className="loginButton">Iniciar sesión</button>
            </Link>
          )}
        </div>
      </div>
    </>
  );
}
