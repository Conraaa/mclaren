import React from 'react'
import './sponsor.css'
import Bar from './Bar'
import Video1 from '../Videos/mclarenf1.mp4'
import ReactPlayer from 'react-player'
export default function sponsor() {
  return (
    <div>  
      <Bar/>
      <ReactPlayer url={ Video1 } 
            playing
            loop
            muted
            />
</div>
  )
}
