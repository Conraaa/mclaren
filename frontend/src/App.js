import React from 'react';
import lock from './Imagenes/Lock.png'
import USER from './Imagenes/USER.png'
import video from './Videos/mclarenf1.mp4'
import ReactPlayer from 'react-player';
import './App.css';

function App() {
  return (
    <div Class="Envoltura">
    <div class="video">
     <ReactPlayer class="video1" url= { video }
     muted
     playing
     loop
     />
     </div> 
     <div class="Envoltura2" >
        <form class="Formulario">

          <h1>Login</h1>
          <div class="log_caja">
          <input type="text" placeholder='Legajo' required/>
          <img src= { USER } alt="Imagen de usuario"/>
          </div>
          <div class="log_caja">
          <input type="password" placeholder='Contraseña' required/>
          <img  src= { lock } alt =" Imagen de Seguro"/> 
          </div>

          <button type="submit" class="Boton" >Log in</button>
        </form>

      </div>
    </div>
  );
}

export default App;
