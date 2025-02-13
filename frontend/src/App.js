import React from 'react';
import Login from './paginas/login/login.jsx';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './paginas/Home/home.jsx';
import Carreras from './paginas/Carreras/carreras.jsx';
import Pistas from './paginas/Pistas/pistas.jsx';
import Empleados from './paginas/Empleados/empleados.jsx';
import Departamentos from './paginas/Departamentos/departamentos.jsx';
import Aerodinamica from './paginas/Departamentos/aerodinamica.jsx';
import GrupoMotor from './paginas/Departamentos/grupomotor.jsx';
import AltaEmpleados from './paginas/Empleados/AltaEmpleados/AltaEmpleados.jsx';
import Registro from './paginas/login/Registro/Registro.jsx';
import ListadoEstrategia from './paginas/Estrategias/listadoEstrategia.jsx'
import Soporte from './paginas/SolvingTickets/Solving.jsx';

function App() {
  return (
      <Router>
          <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="Login" element={<Login/>}/>
          <Route path="Carreras" element={<Carreras/>}/>
          <Route path="Pistas" element={<Pistas/>}/>
          <Route path="Empleados" element={<Empleados/>}/>
          <Route path="Departamentos" element={<Departamentos/>}/>
          <Route path="AltaEmpleados" element={<AltaEmpleados/>}/>
          <Route path="Registro" element={<Registro/>}/>
          <Route path="Departamentos/Aerodinamica" element={<Aerodinamica/>}/>
          <Route path="Departamentos/GrupoMotor" element={<GrupoMotor/>}/>
          <Route path="ListadoEstrategia" element={<ListadoEstrategia/>}/>
          <Route path="Soporte" element={<Soporte/>}/>
          </Routes>
      </Router>
  );
}

export default App;
