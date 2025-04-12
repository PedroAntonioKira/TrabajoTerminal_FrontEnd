import { useContext } from "react"; // ✅ Importar `useContext`
import { NavLink, useNavigate } from "react-router-dom";
import "../Styles/VendedorNavBar.css"; // Estilos del menú
import { AuthContext } from "../../../context/AuthContext";
import Swal from "sweetalert2"; // ✅ Importamos SweetAlert2

/**
 * ✅ Componente de Menú Lateral para Vendedores
 * 🔹 Tiene un botón de hamburguesa para ocultar o mostrar el menú.
 * 🔹 Usa `NavLink` para marcar el enlace activo.
 */
const VendedorNavBar = ({ isOpen, toggleMenu }) => {

  const { logout } = useContext(AuthContext); // 👈 Obtenemos la función logout
  const navigate = useNavigate(); // 👈 Hook para redirigir al index.html

  // ✅ Función para cerrar sesión
  const handleLogout = () => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "Se cerrará tu sesión y serás redirigido al inicio.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, cerrar sesión",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        logout(); // Cerramos sesión
        Swal.fire("Sesión cerrada", "Has cerrado sesión correctamente.", "success");
        navigate("/index.html"); // Redirigimos al usuario
      }
    });
  };

  return (
    <nav className={`sidebar ${isOpen ? "open" : "closed"}`}>
      {/* Botón de hamburguesa */}
      <button className={`menu-toggle ${isOpen ? "open" : "closed"}`} onClick={toggleMenu}>
        {isOpen ? "❌" : "☰"} {/* Cambia el icono según el estado */}
      </button>

      <ul>
        <li>
          <NavLink to="./" relative="path">🏠 <span>Principal</span></NavLink>
        </li>
        <li>
          <NavLink to="./mis-productos" relative="path">📦 <span> Mis Productos </span></NavLink>
        </li>
        <li>
          <NavLink to="./mis-categorias" relative="path">📂 <span>Mis Categorías</span></NavLink>
        </li>
        <li>
          <NavLink to="./mis-proveedores" relative="path">🏢 <span>Mis Proveedores</span></NavLink>
        </li>
        <li>
          <NavLink to="./nuevo-producto" relative="path">➕📦 <span>Crear Producto</span></NavLink>
        </li>
        <li>
          <NavLink to="./nueva-categoria" relative="path">➕📂 <span>Crear Categoría</span></NavLink>
        </li>
        <li>
          <NavLink to="./nuevo-proveedor" relative="path">➕🏢 <span>Crear Proveedor</span></NavLink>
        </li>
        <li>
          <NavLink to="./ventas-concretadas" relative="path">✅ <span> Ventas</span></NavLink>
        </li>
        <li>
          <NavLink to="./reportes" relative="path">📈 <span> Reportes</span></NavLink>
        </li>
        <li>
          <NavLink to="./mi-cuenta" relative="path">🤓 <span>Mi Cuenta</span></NavLink>
        </li>

        <li>
          <button className={`cerrarSesion ${isOpen ? "open" : "closed"}`} onClick={handleLogout}> 🚫 <span>Cerrar Sesión</span></button>
        </li>
      </ul>
    </nav>
  );
};

export default VendedorNavBar;
