import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthProvider";
import Swal from "sweetalert2";
import "./sweetalert.css"; // Importamos el CSS

const ProtectedRoute = ({ allowedDepartments }) => {
    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            Swal.fire({
                title: "Acceso restringido",
                text: "No puedes acceder porque no estás logueado.",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "Iniciar sesión",
                cancelButtonText: "Volver al Home",
                allowOutsideClick: false,
                customClass: {
                    popup: "swal-dark", // Fondo negro con borde naranja
                    confirmButton: "swal-button-orange", // Botón naranja
                    cancelButton: "swal-button-orange", // Botón naranja también
                    backdrop: "swal-overlay", // Fondo rojo detrás de la alerta
                },
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate("/Login");
                } else {
                    navigate("/");
                }
            });
        } else {
            const userDepartment = String(user.departamento);

            if (!allowedDepartments.includes(userDepartment)) {
                Swal.fire({
                    title: "Acceso denegado",
                    text: "No puedes acceder porque no tienes permisos.",
                    icon: "error",
                    confirmButtonText: "Volver al Home",
                    allowOutsideClick: false,
                    customClass: {
                        popup: "swal-dark", // Fondo negro con borde naranja
                        confirmButton: "swal-button-orange", // Botón naranja
                        backdrop: "swal-overlay", // Fondo rojo detrás de la alerta
                    },
                }).then(() => navigate("/"));
            }
        }
    }, [user, allowedDepartments, navigate]);

    if (!user || (user && !allowedDepartments.includes(String(user.departamento)))) {
        return null; // Evita renderizar la página hasta que el usuario sea redirigido
    }

    return <Outlet />;
};

export default ProtectedRoute;

