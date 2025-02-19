import { createContext, useContext, useState } from "react";
import { Navigate } from "react-router-dom";

// Crear el contexto de autenticación
const AuthContext = createContext();

// Proveedor de autenticación
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const userLegajo = localStorage.getItem("userLegajo");
        const userName = localStorage.getItem("userName");
        const userDepartment = localStorage.getItem("userDepartment");
    
        return userLegajo && userName && userDepartment
            ? { legajo: userLegajo, nombre: userName, departamento: userDepartment }
            : null;
    });

    // Función para iniciar sesión
    const login = (userData) => {
        setUser(userData);
        localStorage.setItem("userLegajo", userData.legajo);
        localStorage.setItem("userName", userData.nombre);
        localStorage.setItem("userDepartment", userData.departamento);
    };

    // Función para cerrar sesión
    const logout = () => {
        setUser(null);
        localStorage.removeItem("userLegajo");
        localStorage.removeItem("userName");
        localStorage.removeItem("userDepartment");
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);

export const RutaProtegida = ({ children }) => {
    const { user } = useAuth();

    if (user === null) {
        return <div>Cargando...</div>;
    }

    if (!user) {
        alert("No tienes permiso para acceder.");
        return <Navigate to="/login" />;
    }

    return children;
};