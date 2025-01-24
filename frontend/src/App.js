import React from 'react';
import Login from './paginas/login/login.jsx';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './paginas/Home/home.jsx';
import Piezas from './paginas/Piezas/piezas.jsx';
import Estrategia from './paginas/Estrategias/Estrategia.jsx';
import Carreras from './paginas/Carreras/carreras.jsx';
import Pistas from './paginas/Pistas/pistas.jsx';
import Empleados from './paginas/Empleados/empleados.jsx';
import Departamentos from './paginas/Departamentos/departamentos.jsx';
import AltaEmpleados from './paginas/Empleados/AltaEmpleados/AltaEmpleados.jsx';
import Registro from './paginas/login/Registro/Registro.jsx';
function App() {
  return (
      <Router>
          <Routes>
          <Route path="/" element={<Login/>}/>
          <Route path="home" element={<Home/>}/>
          <Route path="piezas" element={<Piezas/>}/>
          <Route path="Estrategia" element={<Estrategia/>}/>
          <Route path="carreras" element={<Carreras/>}/>
          <Route path="pistas" element={<Pistas/>}/>
          <Route path="empleados" element={<Empleados/>}/>
          <Route path="departamentos" element={<Departamentos/>}/>
          <Route path="AltaEmpleados" element={<AltaEmpleados/>}/>
          <Route path="Registro" element={<Registro/>}/>
          </Routes>
      </Router>
  );
}

export default App;
