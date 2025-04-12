import { useState } from "react";
import { Outlet } from "react-router-dom";
import VendedorNavBar from "./VendedorNavBar"; // Importamos el menú
import "../Styles/Ventas.css"; // Estilos generales


/**
 * ✅ Página Principal del Vendedor
 * 🔹 Integra `VendedorNavBar` con `useState` para controlar su visibilidad.
 * 🔹 Usa `<Outlet />` para mostrar las subrutas dentro de `Ventas.jsx`.
 */
const Ventas = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(true); // Estado del menú

  // Función para alternar la visibilidad del menú
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <div className="ventas-container">
      {/* Menú lateral */}
      <VendedorNavBar isOpen={isMenuOpen} toggleMenu={toggleMenu} />

      {/* Contenido Principal Contenedor*/}
      <div className={`Contenedor ${isMenuOpen ? "menu-visible" : "menu-hidden"}`}>
        <div className={`content ${isMenuOpen ? "menu-visible" : "menu-hidden"}`}>
          {/*<h1>Bienvenido a la Sección de Ventas</h1>*/}
          <Outlet /> {/* Aquí se renderizan las subrutas */}
        </div>
      </div>
      
    </div>
  );
};

export default Ventas;
