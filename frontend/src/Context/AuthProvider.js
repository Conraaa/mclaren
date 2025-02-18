import { createContext, useContext, useState, useEffect } from "react";

// Crear el contexto de autenticación
const AuthContext = createContext();

// Proveedor de autenticación
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    // Cargar el usuario desde localStorage al iniciar la app
    useEffect(() => {
        const userLegajo = localStorage.getItem('userLegajo');
        const userName = localStorage.getItem('userName');
        const userDepartment = localStorage.getItem('userDepartment');
    
        if (userLegajo && userName && userDepartment) {
            setUser({
                legajo: userLegajo,
                nombre: userName,
                departamento: userDepartment,
            });
        }
    }, []);

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

// Hook para acceder al contexto
export const useAuth = () => useContext(AuthContext);
