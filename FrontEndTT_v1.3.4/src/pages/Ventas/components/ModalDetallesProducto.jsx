/**
 * Componente Modal para mostrar todos los detalles de un producto.
 * Incluye imagen grande, tabla de detalles, y botones para editar o eliminar.
 */

import React from "react";
import PropTypes from "prop-types";
import { FaTimes, FaTrash, FaEdit } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";

const ModalDetallesProducto = ({ producto, onClose }) => {
  return (
    <div
      className="modal fade show"
      style={{ display: "block", backgroundColor: "rgba(0,0,0,0.6)" }}
      tabIndex="-1"
      role="dialog"
    >
      <div className="modal-dialog modal-lg modal-dialog-centered">
        <div className="modal-content">
          {/* Encabezado con botón de cierre */}
          <div className="modal-header">
            <h5 className="modal-title">Detalles del Producto</h5>
            <button type="button" className="btn-close" onClick={onClose}>
              <FaTimes />
            </button>
          </div>

          {/* Imagen principal */}
          <div className="text-center p-3">
            <img
              src={producto.url_imagen_Producto}
              alt={producto.nombre_Producto}
              className="img-fluid rounded shadow"
              style={{ maxHeight: "300px", objectFit: "cover" }}
            />
          </div>

          {/* Tabla de detalles */}
          <div className="modal-body">
            <table className="table table-bordered table-striped">
              <tbody>
                {Object.entries(producto).map(([key, value]) => (
                  key !== "url_imagen_Producto" && (
                    <tr key={key}>
                      <th>{key.replace(/_/g, ' ')}</th>
                      <td>{value}</td>
                    </tr>
                  )
                ))}
              </tbody>
            </table>
          </div>

          {/* Botones de acción */}
          <div className="modal-footer justify-content-between">
            <button className="btn btn-outline-secondary" onClick={onClose}>
              Cerrar
            </button>
            <div>
              <button className="btn btn-warning me-2">
                <FaEdit className="me-1" /> Editar
              </button>
              <button className="btn btn-danger">
                <FaTrash className="me-1" /> Eliminar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

ModalDetallesProducto.propTypes = {
  producto: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ModalDetallesProducto;
