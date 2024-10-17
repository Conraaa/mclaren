import React from 'react'
import './Componente1.css'
import Logo from '../Imagenes/Logo.png'
import Logocentral from '../Imagenes/Logo_Central.png'
import MC21 from '../Imagenes/MC21.png'
import MC22 from '../Imagenes/MC22.png'
import MC23 from '../Imagenes/MC23.png'
import A21 from '../Imagenes/A21.jpg'
import A22 from '../Imagenes/A22.jpg'
import A23 from '../Imagenes/A23.jpg'
import MC24 from '../Imagenes/MC24.png'
import A24 from '../Imagenes/A24.png'
import I21 from '../Imagenes/OscarLando.png'
import I22 from '../Imagenes/OscarLando2.png'
import I23 from '../Imagenes/Lando.png'
import I24 from '../Imagenes/Oscar.png'
import AA1 from '../Imagenes/2021.png'
import AA2 from '../Imagenes/2022.png'
import AA3 from '../Imagenes/2023.png'
import AA4 from '../Imagenes/2024.png'
import Video from '../Videos/this is mclaren.mp4'
import ReactPlayer from 'react-player'
import PreVideo from '../Imagenes/wp12483319.png'

export default function Componente1() {
  const thumbs = document.querySelectorAll('.thumb li');
  const infoSlider = document.querySelectorAll('.info-slider');
  const items = document.querySelectorAll('.item');
  let index = 0;


  thumbs.forEach((thumb, ind) => {
    thumb.addEventListener('click', (event) => {
    
        document.querySelector('.thumb .selected').classList.remove('selected')
        thumb.classList.add('selected')
        index = ind;
        infoSlider.forEach(slide => {
          slide.style.transform =`translateY(${ index * -400}%)`;
        })
        document.querySelector('.item.active').classList.remove('active')
          items[index].classList.add('active')


      })
    });
  return (

    <div Class="Todo">
        <div class="bar">
        <img class="Logo" src= { Logo } alt="logo de la pagina"/>
        <img class="Logo_central" src= { Logocentral } alt ="Logo de en medio"/>
        <h4 class="user">User</h4>
    </div>
<div class="carrusel">
  <div class="item active">
    <div class="img-box">
      <img src={ MC21 } alt="Coche 2021" />
      <img class="pilot" src={ I21 } alt="Pilotos 2021" />
      <img class="anio" src={ AA1 } alt="Pilotos 2021" />
      <div className="info-box">
        <div className="info-slider">
          <div className="info-item" style={{ "--i": 1 }}>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="item">
    <div class="img-box">
      <img src={ MC22 } alt="Coche 2022" />
      <img class="pilot" src={ I22 } alt="Pilotos 2021" />
      <img class="anio" src={ AA2 } alt="Pilotos 2021" />
      <div className="info-box">
        <div className="info-slider">
          <div className="info-item" style={{ "--i": 2 }}>

          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="item">
    <div class="img-box">
    <img src={ MC23 } alt="Coche 2023" />
    <img class="pilot" src={ I23 } alt="Pilotos 2021" />
    <img class="anio" src={ AA3 } alt="Pilotos 2021" />
      <div className="info-box">
        <div className="info-slider">
          <div className="info-item" style={{ "--i": 3 }}>

          </div>
        </div>
      </div>
    </div>
  </div><div class="item">
    <div class="img-box">
    <img src={ MC24 } alt="Coche 2024" />
    <img class="pilot" src={ I24 } alt="Pilotos 2021" />
    <img class="anio" src={ AA4 } alt="Pilotos 2021" />
      <div className="info-box">
        <div className="info-slider">
          <div className="info-item" style={{ "--i": 4 }}>

          </div>
        </div>
      </div>
    </div>
  </div>
    <ul class="thumb">
    <li class="selected"><img src= { A21 } alt="Año 2022" /></li>
    <li><img src= { A22 } alt="Año 2022" /></li>
    <li><img src= { A23 } alt="Año 2022" /></li>
    <li><img src= { A24 } alt="Año 2022" /></li>

    </ul>
</div>
<div class="video" >
        <ReactPlayer url={ Video }
        width={1342}
        height={542}
        playing
        light={ PreVideo } />
      </div>
     
    </div>
  );
}
