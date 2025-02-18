import React, { useEffect, useState } from 'react';
import './BarIntro.css';
import './intro/IntroPrimera.css';
import Logo from '../Imagenes/Logo.png';
import Logocentral from '../Imagenes/Logo_Central.png';
import { Link } from 'react-router-dom';
import Intro from './intro/IntroPrimera';
import IntroSegunda from '../Bar/intro/Intro';

export default function Bar() {
  const [userName, setUserName] = useState('');
  const [userDepartment, setUserDepartment] = useState('');
  const [userLegajo, setUserLegajo] = useState('');
  const [introCount, setIntroCount] = useState(null);

  useEffect(() => {
    const storedCount = parseInt(sessionStorage.getItem('introCount') || '0', 10);
    setIntroCount(storedCount);

    // Obtener los datos del usuario desde localStorage
    const storedName = localStorage.getItem('userName');
    const storedDepartment = localStorage.getItem('userDepartment');
    const storedLegajo = localStorage.getItem('userLegajo');

    if (storedName && storedDepartment && storedLegajo) {
      setUserName(storedName);
      setUserDepartment(storedDepartment);
      setUserLegajo(storedLegajo);
    }
  }, []);

  const handleIntroFinish = () => {
    const newCount = (introCount ?? 0) + 1;
    sessionStorage.setItem('introCount', newCount.toString());      //Mantiene una cuenta en sessionStorage de cuantas veces se visitó home para asi saber que video mostrar
    setIntroCount(newCount);
  };

  if (introCount === null) {
    return null;
  }

  return (
    <>
      {introCount === 0 ? (
        <Intro onFinish={handleIntroFinish} />
      ) : (
        <IntroSegunda onFinish={handleIntroFinish} />
      )}

      {/* Contenido principal */}
      <div className="bar hidden-content">
          <div className="logoMenú">
            <nav>
              <ul className="menuHorizontal">
                <li>
                  <Link>
                    <img className="Logo" src={Logo} alt="logo de la pagina" />
                  </Link>
                  <ul className="menuVertical">
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
                    sessionStorage.clear();
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