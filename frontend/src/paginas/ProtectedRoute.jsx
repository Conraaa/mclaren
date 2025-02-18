import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../Context/AuthProvider";

const ProtectedRoute = ({ allowedDepartments }) => {
    const { user } = useAuth();
    console.log(user);  // Verifica que el usuario tiene los datos correctos
    // Si el usuario no está logueado
    if (!user) {
        return <Navigate to="/Login" state={{ from: window.location.pathname }} />;
    }

    // Asegurarse de que user.departamento sea una string
    const userDepartment = String(user.departamento);
    console.log(`User department: ${userDepartment}`);
    console.log(`Allowed departments: ${allowedDepartments}`);

    // Si el usuario no está en el departamento adecuado
    if (!allowedDepartments.includes(userDepartment)) {
        return <Navigate to="/" />;  // Redirige al Home
    }

    return <Outlet />;
};

export default ProtectedRoute;
