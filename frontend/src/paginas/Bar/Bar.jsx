import React from 'react';
import './Bar.css';
import Logo from '../Imagenes/Logo.png';
import Logocentral from '../Imagenes/Logo_Central.png';
import { Link } from 'react-router-dom';
export default function Bar() {
  return (
    <div class="bar">
    <div class="logoMenú">
  <nav >
  <ul class="menuHorizontal">
    
    <li>
        <Link><img class="Logo" src= { Logo } alt="logo de la pagina"/></Link>
        <ul class="menuVertical">
          <li><Link to="/home"><button><b>Home</b></button></Link></li>
          <li><Link to="/empleados"><button><b>Empleados</b></button></Link></li>
          <li><Link to="/carreras"><button><b>Carreras</b></button></Link></li>
          <li><Link to="/piezas"><button><b>Piezas</b></button></Link></li>
          <li><Link to="/pistas"><button><b>Pistas</b></button></Link></li>
          <li><Link to="/Estrategia"><button><b>Estrategia</b></button></Link></li>
          <li><Link to="/Departamentos"><button><b>Departamento</b></button></Link></li>
          
        </ul>
    </li>
  </ul>
  </nav>
    </div>
  <img class="Logo_central" src= { Logocentral } alt ="Logo de en medio"/>
  <h4 class="user">User</h4>
  </div>
  )
}
