import React from 'react';
import './Estrategia.css';
import imagen from '../Imagenes/Estrategia.jpg';
import Bar from '../Bar/Bar'
export default function Home() {
  return (
    <div >
      <Bar/>
      <header>
        <h3>Formulario de Estrategia</h3>
      </header>

      <div className="contenedor-imagen">
        <img className="imagenEstrategia" src={imagen} alt="Estrategia de coche" />

        {/* Campos de entrada */}
        <input type="text" placeholder="Alerón Delantero"  id="AleronD" />
        <input type="text" placeholder="Motor" id="Motor" />
        <input type="text" placeholder="Caja de Cambios"  id="CajaCambios" />
        <input type="text" placeholder="Alerón Trasero"  id="AleronT" />
        <input type="text" placeholder="Pontones"  id="Pontones" />
        <input type="text" placeholder="Fondo Plano"  id="FondoPlano" />
        <input type="text" placeholder="Difusor"  id="Difusor" />
      </div>
    </div>
  );
}
