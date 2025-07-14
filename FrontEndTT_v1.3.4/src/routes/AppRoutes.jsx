import { Routes, Route, Navigate, useLocation} from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute"; // 🔹 Protege las rutas según el rol del usuario

// 📌 Importamos las páginas principales
import Login from "../pages/Login";
import App from "../App";
import Dashboard from "../pages/Dashboard";  // Cliente
import Ventas from "../pages/Ventas/components/Ventas";  // Vendedor
import Admin from "../pages/Admin";  // Admin
import NotFound from "../pages/NotFound";

// 📌 Importamos las subpáginas (subrutas)
import MisProductos from "../pages/Ventas/components/Ventas_MisProductos";  // Vendedor
import MiCuentaVendedor from "../pages/Ventas/components/Ventas_MiCuenta";  // Vendedor
import MisCategorias from "../pages/Ventas/components/Ventas_MisCategorias"; // Vendedor
import MisProveedores from "../pages/Ventas/components/Ventas_MisProveedores"; // Vendedor
import NuevoProducto from "../pages/Ventas/components/Ventas_NuevoProducto" // Vendedor
import NuevaCategoria from "../pages/Ventas/components/Ventas_NuevaCategoria" // Vendedor
import NuevoProveedor from "../pages/Ventas/components/Ventas_NuevoProveedor" // Vendedor
import VentasConcretadas from "../pages/Ventas/components/Ventas_VentasConcretadas" // Vendedor
import EditarMiCuenta from "../pages/Ventas/components/Ventas_EditarMiCuenta"; // Vendedor
import CambiarCredenciales from "../pages/Ventas/components/Ventas_CambiarCredenciales"; // Vendedor
import Reportes from "../pages/Ventas/components/Ventas_Reportes";
import VentasPrincipal from "../pages/Ventas/components/Ventas_Principal";
import MiCuentaCliente from "../pages/Dashboard_MiCuenta";  // Cliente

import { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext"; 



const AppRoutes = () => {
  //const user = JSON.parse(localStorage.getItem("user"));
  const { isAuthenticated, user, fetchUserData } = useContext(AuthContext);
  const location = useLocation(); // 🔥 Detecta cambios en la ruta

  /**
   * ✅ `useEffect` para actualizar los datos del usuario cada vez que cambia de ruta.
   * - Llamamos a `fetchUserData()` para asegurarnos de que la información esté siempre actualizada.
   * - Solo ejecutamos esto si el usuario ya ha iniciado sesión (`isAuthenticated()`).
   */
  useEffect(() => {
    if (isAuthenticated()) {
      fetchUserData();
    }
  }, [location]); // 🔥 Se ejecuta cada vez que cambia la ruta

  
  return (
    <Routes>
      {/* 🔹 Ruta de inicio: si el usuario ya está autenticado, lo redirige a su página correspondiente */}
      <Route path="/" //aqui
        element={
          isAuthenticated() ? (
            <Navigate
              to={
                    user?.role === "Cliente"
                  ? "/dashboard"
                  : user?.role === "Vendedor"
                  ? "/ventas"
                  : user?.role === "Admin" 
                  ?"/admin"
                  :"/*"
              }
              replace
            />
          ) : (
            <App /> // Si no está autenticado, lo enviamos al login
          )
        }
      />

      {/* 🔹 Rutas protegidas para CLIENTE */}
      <Route element={<ProtectedRoute allowedRoles={["Cliente"]} />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/mi-cuenta" element={<MiCuentaCliente />} />
      </Route>

      {/* 🔹 Rutas protegidas para VENDEDOR */}
      <Route element={<ProtectedRoute allowedRoles={["Vendedor"]} />}>
        <Route path="/ventas" element={<Ventas />}>
          <Route index element={<VentasPrincipal />} />
          <Route path="mis-productos" element={<MisProductos />} />
          <Route path="mis-categorias" element={<MisCategorias />} />
          <Route path="mis-proveedores" element={<MisProveedores />} />
          <Route path="nuevo-producto" element={<NuevoProducto />} />
          <Route path="nueva-categoria" element={<NuevaCategoria />} />
          <Route path="nuevo-proveedor" element={<NuevoProveedor />} />
          <Route path="ventas-concretadas" element={<VentasConcretadas />} />
          <Route path="Reportes" element={<Reportes />} />
          
          {/* 🟢 Sección de Mi Cuenta */}
          <Route path="mi-cuenta" element={<MiCuentaVendedor />} />
          <Route path="mi-cuenta/editar" element={<EditarMiCuenta />} />
          <Route path="mi-cuenta/cambiar-credenciales" element={<CambiarCredenciales />} />
        </Route>
      </Route>



      {/* 🔹 Rutas protegidas para ADMINISTRADOR */}
      <Route element={<ProtectedRoute allowedRoles={["Admin"]} />}>
        <Route path="/admin" element={<Admin />} />
      </Route>

      {/* 🔹 Página 404 si la ruta no existe */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
