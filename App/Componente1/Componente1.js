import React from 'react'
import './Componente1.css'
import ReactPlayer from 'react-player'
import Video from '../Video/this is mclaren.mp4'
import PreVideo from '../Imagenes/Pre-Video.jpg'
export default function Componente1() {
  return (
    <div class="video" >
    <ReactPlayer url={ Video }
    width={1342}
    height={542}
    playing
    light={ PreVideo } />
    </div>
  )
}
