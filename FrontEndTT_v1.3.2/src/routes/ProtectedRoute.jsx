import { Navigate, Outlet, useLocation } from "react-router-dom";

// Mapeo de roles a rutas permitidas
const roleRoutes = {
  Cliente: "/dashboard",
  Vendedor: "/ventas",
  Admin: "/admin",
};

// Componente para proteger rutas
const ProtectedRoute = () => {
  const user = JSON.parse(localStorage.getItem("user")); // Obtener usuario del localStorage
  const location = useLocation(); // Obtener la URL actual

  // 🔹 Si no está autenticado, redirigir al login
  if (!user || !user.accessToken) {
    return <Navigate to="/index.html" replace />;
  }

  // 🔹 Si el usuario intenta acceder a una ruta que no le corresponde
  const allowedRoute = roleRoutes[user.role]; // Obtener ruta base permitida por su rol
  if (!location.pathname.startsWith(allowedRoute)) {
    return <Navigate to={allowedRoute} replace />;
  }

  return <Outlet />; // Si todo está bien, mostrar la página
};

export default ProtectedRoute;


