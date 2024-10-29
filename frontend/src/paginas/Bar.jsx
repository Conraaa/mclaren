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
          <li><Link to="/home"><button>Home</button></Link></li>
          <li><Link to="/empleados"><button>Empleados</button></Link></li>
          <li><Link to="/carreras"><button>Carreras</button></Link></li>
          <li><Link to="/piezas"><button>Piezas</button></Link></li>
          <li><Link to="/pistas"><button>Pistas</button></Link></li>
          <li><Link to="/sponsor"><button>Sponsor</button></Link></li>
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
