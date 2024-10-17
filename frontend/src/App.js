import React from 'react';
import Login from './paginas/login.jsx';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './paginas/home.jsx';
import Piezas from './paginas/piezas.jsx';
import Sponsor from './paginas/sponsor.jsx';
import Carreras from './paginas/carreras.jsx';
import Pistas from './paginas/pistas.jsx';
import Empleados from './paginas/empleados.jsx';
import Departamentos from './paginas/departamentos.jsx';
function App() {
  return (
      <Router>
          <Routes>
          <Route path="/" element={<Login/>}/>
          <Route path="home" element={<Home/>}/>
          <Route path="piezas" element={<Piezas/>}/>
          <Route path="sponsor" element={<Sponsor/>}/>
          <Route path="carreras" element={<Carreras/>}/>
          <Route path="pistas" element={<Pistas/>}/>
          <Route path="empleados" element={<Empleados/>}/>
          <Route path="departamentos" element={<Departamentos/>}/>

          </Routes>

      </Router>
  );
}

export default App;
