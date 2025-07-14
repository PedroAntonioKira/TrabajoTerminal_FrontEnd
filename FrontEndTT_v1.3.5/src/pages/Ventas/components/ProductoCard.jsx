/**
 * Componente que representa una card visual para mostrar información resumida del producto.
 * Incluye imagen, nombre, precio, stock, promoción y botón para ver detalles.
 */

import React from "react";
import { FaEye } from "react-icons/fa";
import PropTypes from "prop-types";

const ProductoCard = ({ producto, onVerDetalles }) => {
  const {
    nombre_Producto,
    precioNeto_Producto,
    stock_Producto,
    promocion_Producto,
    url_imagen_Producto,
  } = producto;

  return (
    <div className="col-md-4 mb-4">
      <div className="card h-100 shadow-sm">
        {/* Imagen del producto */}
        <img
          src={url_imagen_Producto}
          className="card-img-top img-fluid"
          alt={nombre_Producto}
          style={{ objectFit: "cover", height: "200px" }}
        />

        <div className="card-body d-flex flex-column">
          {/* Nombre del producto */}
          <h5 className="card-title text-truncate">{nombre_Producto}</h5>

          {/* Precio y stock */}
          <p className="card-text mb-1">
            <strong>Precio:</strong> ${precioNeto_Producto}
          </p>
          <p className="card-text mb-1">
            <strong>Stock:</strong> {stock_Producto}
          </p>
          <p className="card-text mb-3">
            <strong>Promoción:</strong> {promocion_Producto}
          </p>

          {/* Botón para ver detalles */}
          <button
            className="btn btn-outline-primary mt-auto"
            onClick={onVerDetalles}
          >
            <FaEye className="me-2" /> Ver detalles
          </button>
        </div>
      </div>
    </div>
  );
};

ProductoCard.propTypes = {
  producto: PropTypes.object.isRequired,
  onVerDetalles: PropTypes.func.isRequired,
};

export default ProductoCard;
