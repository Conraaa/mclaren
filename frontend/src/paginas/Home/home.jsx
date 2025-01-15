import React from 'react'
import './home.css'
import Bar from './Bar'
import Video1 from '../Videos/Video4.mp4';
import Video2 from'../Videos/Video5.mp4';
import Video3 from '../Videos/Video2.mp4';
import Video4 from '../Videos/Video6.mp4';
import ReactPlayer from 'react-player';
export default function home() {

  return (
    <div class="Fondo">  
      <Bar/>
      <div className="CajaCarrusel">
        <ul>
            <li>
            <ReactPlayer className="Video" url={ Video1 } 
            playing
            loop
            muted
            width="100%" 
            height="100%" 
            />
                <div className="texto">
                <h2>HOLA PUTOS</h2>
                <p>PUTOS HOLA SADSADSADSADSAD</p>

                </div>

            </li>
            <li>
            <ReactPlayer className="Video" url={ Video2 } 
            playing
            loop
            muted
            width="100%" 
            height="100%" 
            />
                <div className="texto">
                    <h2>HOLA PUTOS</h2>
                    <p>PUTOS HOLA SADSADSADSADSAD</p>
                </div>

            </li>
            <li>
            <ReactPlayer className="Video" url={ Video3 } 
            playing
            loop
            muted
            width="100%" 
            height="100%" 
            />
                <div className="texto">
                <h2>HOLA PUTOS</h2>
                <p>PUTOS HOLA SADSADSADSADSAD</p>

                </div>

            </li>
            <li>
            <ReactPlayer className="Video" url={ Video4 } 
            playing
            loop
            muted
            width="100%" 
            height="100%" 
            />
                <div className="texto">
                <h2>HOLA PUTOS</h2>
                <p>PUTOS HOLA SADSADSADSADSAD</p>

                </div>

            </li>


        </ul>

      </div>
    </div>

  )
}
