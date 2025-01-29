import React from 'react';
import Login from './paginas/login/login.jsx';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './paginas/Home/home.jsx';
import Estrategia from './paginas/Estrategias/Estrategia.jsx';
import Carreras from './paginas/Carreras/carreras.jsx';
import Pistas from './paginas/Pistas/pistas.jsx';
import Empleados from './paginas/Empleados/empleados.jsx';
import Departamentos from './paginas/Departamentos/departamentos.jsx';
import Aerodinamica from './paginas/Departamentos/aerodinamica.jsx';
import GrupoMotor from './paginas/Departamentos/grupomotor.jsx';
import AltaEmpleados from './paginas/Empleados/AltaEmpleados/AltaEmpleados.jsx';
import Registro from './paginas/login/Registro/Registro.jsx';
import ListadoEstrategia from './paginas/Estrategias/Listado/listadoEstrategia.jsx';
function App() {
  return (
      <Router>
          <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="login" element={<Login/>}/>
          <Route path="Estrategia" element={<Estrategia/>}/>
          <Route path="carreras" element={<Carreras/>}/>
          <Route path="pistas" element={<Pistas/>}/>
          <Route path="empleados" element={<Empleados/>}/>
          <Route path="departamentos" element={<Departamentos/>}/>
          <Route path="AltaEmpleados" element={<AltaEmpleados/>}/>
          <Route path="Registro" element={<Registro/>}/>
          <Route path="Aerodinamica" element={<Aerodinamica/>}/>
          <Route path="GrupoMotor" element={<GrupoMotor/>}/>
          <Route path="ListadoEstrategia" element={<ListadoEstrategia/>}/>
          </Routes>
      </Router>
  );
}

export default App;
