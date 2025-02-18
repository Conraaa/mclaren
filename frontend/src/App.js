import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './paginas/ProtectedRoute.jsx';
import Home from './paginas/Home/home.jsx';
import Carreras from './paginas/Carreras/carreras.jsx';
import Pistas from './paginas/Pistas/pistas.jsx';
import Empleados from './paginas/Empleados/empleados.jsx';
import Departamentos from './paginas/Departamentos/departamentos.jsx';
import Aerodinamica from './paginas/Departamentos/aerodinamica.jsx';
import GrupoMotor from './paginas/Departamentos/grupomotor.jsx';
import Estrategia from './paginas/Estrategias/listadoEstrategia.jsx';
import Login from './paginas/login/login.jsx';
import AltaEmpleados from './paginas/Empleados/AltaEmpleados/AltaEmpleados.jsx';
import Registro from './paginas/login/Registro/Registro.jsx';
import Soporte from './paginas/SolvingTickets/Solving.jsx';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="Login" element={<Login />} />
                <Route path="Carreras" element={<Carreras />} />
                <Route path="Pistas" element={<Pistas />} />
                <Route path="Departamentos" element={<Departamentos />} />
                <Route path="AltaEmpleados" element={<AltaEmpleados />} />
                <Route path="Registro" element={<Registro />} />

                <Route element={<ProtectedRoute allowedDepartments={['Aerodinamica', 'Administracion', 'Grupo Motor', 'Estrategia']} />}>
                    <Route path="Soporte" element={<Soporte />} />
                </Route>
                {/* Ruta protegida para Aerodinamica */}
                <Route element={<ProtectedRoute allowedDepartments={['Aerodinamica', 'Administracion']} />}>
                    <Route path="Departamentos/Aerodinamica" element={<Aerodinamica />} />
                </Route>

                {/* Ruta protegida para Grupo Motor */}
                <Route element={<ProtectedRoute allowedDepartments={['Grupo Motor', 'Administracion']} />}>
                    <Route path="Departamentos/GrupoMotor" element={<GrupoMotor />} />
                </Route>

                {/* Ruta protegida para Estrategia */}
                <Route element={<ProtectedRoute allowedDepartments={['Estrategia', 'Administracion']} />}>
                    <Route path="ListadoEstrategia" element={<Estrategia />} />
                </Route>

                {/* Ruta protegida para Empleados */}
                <Route element={<ProtectedRoute allowedDepartments={['Administracion']} />}>
                    <Route path="Empleados" element={<Empleados />} />
                </Route>
            </Routes>
        </Router>
    );
}

export default App;
