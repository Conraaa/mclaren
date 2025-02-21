import { createContext, useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import { message } from 'antd';

// Crear el contexto de autenticación
const AuthContext = createContext();

// Proveedor de autenticación
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const userLegajo = localStorage.getItem("userLegajo");
        const userName = localStorage.getItem("userName");
        const userDepartment = localStorage.getItem("userDepartment");
        const access = localStorage.getItem('access');
        const refresh= localStorage.getItem('refresh');
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
        localStorage.setItem("access", userData.access);
        localStorage.setItem("refreshToken", userData.refresh);
        console.log(userData);
    };

    // Función para cerrar sesión
    const logout = () => {
        setUser(null);
        localStorage.clear();
    };

    const refreshAccessToken = async () => {
        const refreshToken = localStorage.getItem("refreshToken");
        if (!refreshToken) {
            logout();
            return null;
        }

        try {
            const response = await fetch("http://localhost:8000/api/token/refresh/", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ refresh: refreshToken }),
            });

            if (response.ok) {
                const data = await response.json();
                localStorage.setItem("accessToken", data.access);
                return data.access;
            } else {
                logout();
                return null;
            }
        } catch (error) {
            console.error("Error al renovar el token:", error);
            logout();
            return null;
        }
    };

    const fetchWithAuth = async (url, options = {}) => {
        let token = localStorage.getItem("accessToken");

        const headers = {
            "Content-Type": "application/json",
            ...options.headers,
        };

        if (token) {
            headers["Authorization"] = `Bearer ${token}`;
        }

        const response = await fetch(url, { ...options, headers });

        //Cuando expira el token crea una nuevo
        if (response.status === 401) {
            const newToken = await refreshAccessToken();
            if (newToken) {
                headers["Authorization"] = `Bearer ${newToken}`;
                return fetch(url, { ...options, headers });
            }
        }

        return response;
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
        message.error("No tienes permiso para acceder.");
        return <Navigate to="/login" />;
    }

    return children;
};