import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import Ventas from "../pages/Ventas";
import Admin from "../pages/Admin";
import NotFound from "../pages/NotFound";
import App from "../App";
import ProtectedRoute from "./ProtectedRoute"; // 🔹 Importamos la protección de rutas

const AppRoutes = () => {
    
    const user = JSON.parse(localStorage.getItem("user")); // 🔹 Obtener usuario autenticado

  return (

    <Routes>
      {/* 🔹 Redirigir si el usuario ya está autenticado */}
      <Route
        path="/"
        element={
          user ? (
            <Navigate
              to={
                user.role === "Cliente"
                  ? "/dashboard"
                  : user.role === "Vendedor"
                  ? "/ventas"
                  : "/admin"
              }
              replace
            />
          ) : (
            <App />
          )
        }
      />

      {/* 🔹 Rutas protegidas */}
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/ventas" element={<Ventas />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/login02" element={<Login />} />
      </Route>

      {/* 🔹 Ruta 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
