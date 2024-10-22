import React from 'react'
import Logo from '../Imagenes/Logo.png'
import Logocentral from '../Imagenes/Logo_Central.png'
import './sponsor.css'
export default function sponsor() {
  return (
    <div>  
      <div class="bar">
        <div class="logoMenú">
      <nav >
      <ul class="menuHorizontal">
        
        <li>
            <a><img class="Logo" src= { Logo } alt="logo de la pagina"/></a>
            <ul class="menuVertical">
              <li><a href="./home"></a>Home</li>
              <li><a href="./empleados"></a>Empleados</li>
              <li><a href="./carreras"></a>Carreras</li>
              <li><a href="./piezas"></a>Piezas</li>
              <li><a href="./pistas"></a>Pistas</li>
              <li><a href="./sponsor"></a>Sponsor</li>
            </ul>
        </li>
      </ul>
      </nav>
        </div>
      <img class="Logo_central" src= { Logocentral } alt ="Logo de en medio"/>
      <h4 class="user">User</h4>
      </div>
</div>
  )
}
