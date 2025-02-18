import React, { useState } from 'react';
import './IntroPrimera.css';
import introVideo from '../../Videos/ClipInicio.mp4';

export default function Intro({ onFinish }) {
  const [isFadingOut, setIsFadingOut] = useState(false); // Controla el efecto de desvanecimiento final

  const handleVideoEnd = () => {
    setIsFadingOut(true); // Inicia el efecto de desvanecimiento final
    setTimeout(() => {
      if (onFinish) onFinish(); // Llama a onFinish después del fade-out
    }, 300); // Duración del fade-out final (más corto)
  };

  return (
    <div className={`intro ${isFadingOut ? 'fade-out' : ''}`}>
      <video
        src={introVideo}
        autoPlay
        muted
        className="intro-video"
        onEnded={handleVideoEnd} // Espera a que termine el video para iniciar el fade-out
      />
    </div>
  );
}
