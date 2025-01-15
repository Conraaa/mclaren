import React from 'react';
import './Estrategia.css';
import imagen from '../Imagenes/lando-norris-mclaren-mcl36-1.jpg';

export default function Home() {
  return (
    <div className="Fondo">
      <header>
        <h1>Formulario de Estrategia</h1>
      </header>

      <div className="contenedor-imagen">
        <img src={imagen} alt="Estrategia de coche" className="imagen" />

        {/* Campos de entrada */}
        <input type="text" placeholder="Alerón Delantero" className="input" id="AleronD" />
        <input type="text" placeholder="Motor" className="input" id="Motor" />
        <input type="text" placeholder="Caja de Cambios" className="input" id="CajaCambios" />
        <input type="text" placeholder="Alerón Trasero" className="input" id="AleronT" />
        <input type="text" placeholder="Pontones" className="input" id="Pontones" />
        <input type="text" placeholder="Fondo Plano" className="input" id="FondoPlano" />
        <input type="text" placeholder="Difusor" className="input" id="Difusor" />
      </div>
    </div>
  );
}
