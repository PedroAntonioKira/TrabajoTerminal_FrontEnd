// Ventas_NuevoProducto.jsx
// Componente principal para crear un nuevo producto

import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../../context/AuthContext";
import { useContext } from "react";
import useNuevoProducto from "./useNuevoProducto";
import FormularioProducto from "./FormularioProducto";
import Swal from "sweetalert2";
import "../../Styles/VentasNuevoProducto.css";

const Ventas_NuevoProducto = () => {
  const { user } = useContext(AuthContext); // Obtenemos el usuario autenticado
  const navigate = useNavigate(); // Para redireccionar tras éxito

  // Hook personalizado que gestiona todo el proceso de creación del producto
  const {
    categorias,
    proveedores,
    cargando,
    error,
    producto,
    setProducto,
    imagenPreview,
    handleInputChange,
    handleImageChange,
    handlePrecioBaseChange,
    handlePrecioNetoChange,
    tipoPrecio,
    setTipoPrecio,
    puntosActivos,
    setPuntosActivos,
    crearProducto
  } = useNuevoProducto(user, navigate);

  // Cargar categorías y proveedores al montar el componente
  useEffect(() => {
    // Nada aquí ya que el hook lo hace al inicializar
  }, []);

  return (
    <div class="generalNuevoProducto">
    <div className="container mt-0 nuevoproducto">
      <h2 className="text-center mb-4 bg-primary text-white text-center pb-2 pt-2">Crear Nuevo Producto</h2>

      {/* Mostrar errores generales */}
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      {/* Mostrar spinner si se está cargando algo */}
      {cargando ? (
        <div className="text-center mt-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Cargando...</span>
          </div>
          <p className="mt-3">Cargando información...</p>
        </div>
      ) : (
        <FormularioProducto
          producto={producto}
          setProducto={setProducto}
          categorias={categorias}
          proveedores={proveedores}
          imagenPreview={imagenPreview}
          handleInputChange={handleInputChange}
          handleImageChange={handleImageChange}
          handlePrecioBaseChange={handlePrecioBaseChange}
          handlePrecioNetoChange={handlePrecioNetoChange}
          tipoPrecio={tipoPrecio}
          setTipoPrecio={setTipoPrecio}
          puntosActivos={puntosActivos}
          setPuntosActivos={setPuntosActivos}
          crearProducto={crearProducto}
        />
      )}
    </div>
    </div>
  );
};

export default Ventas_NuevoProducto;
