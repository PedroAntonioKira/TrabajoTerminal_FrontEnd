import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../../context/AuthContext";
import {
  FaPhone,
  FaEnvelope,
  FaBuilding,
  FaEdit,
  FaTrash,
  FaArrowLeft,
  FaArrowRight,
} from "react-icons/fa";
import "../Styles/Ventas_MisProovedores.css"; // Estilos personalizados
import Swal from 'sweetalert2'
import ModalEditarProveedor from "./ModalEditarProveedor";


const Ventas_MisProveedores = () => {
  const { user } = useContext(AuthContext);

  const [proveedores, setProveedores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lastKey, setLastKey] = useState(null);
  const [historyKeys, setHistoryKeys] = useState([]);
  const [error, setError] = useState(null);

  const [proveedorSeleccionado, setProveedorSeleccionado] = useState(null); // Proveedor a editar
  const [mostrarModal, setMostrarModal] = useState(false); // Mostrar u ocultar modal


  useEffect(() => {
    if (user?.sub && user?.accessToken) {
      cargarProveedores();
    }
  }, [user?.sub, user?.accessToken]);

  const cargarProveedores = async (key = null, retroceder = false) => {
    setProveedores([]);
    setLoading(true);
    setError(null);

    try {
      const body = {
        uuid: user.sub,
        ...(key && { lastKey: key }),
      };

      const response = await axios.post(
        "https://190qifrom0.execute-api.us-east-1.amazonaws.com/Development/proveedor-info-vendedor",
        body,
        {
          headers: {
            Authorization: `Bearer ${user.accessToken}`,
          },
        }
      );

      const data = response.data;
      setProveedores(data.proveedores || []);

      if (!retroceder && lastKey !== null) {
        setHistoryKeys((prev) => [...prev, lastKey]);
      }

      if (data.lastKey) {
        setLastKey(data.lastKey);
      } else {
        setLastKey(null);
      }
    } catch (err) {
      console.error("❌ Error:", err);
      setError("Ocurrió un error al obtener los proveedores.");
    } finally {
      setLoading(false);
    }
  };

  const handleNext = () => {
    if (lastKey) {
      cargarProveedores(lastKey);
    }
  };

  const handleBack = () => {
    const newHistory = [...historyKeys];
    newHistory.pop();
    const previousKey = newHistory[newHistory.length - 1] || null;
    setHistoryKeys(newHistory);
    cargarProveedores(previousKey, true);
  };

  const mostrarTexto = (valor, defecto) =>
    valor?.trim() !== "" ? valor : defecto;

  const eliminarProveedor = async (id_proveedor) => {
      const confirmacion = await Swal.fire({
        title: '¿Estás seguro?',
        text: 'Esta acción eliminará el proveedor de forma permanente.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar'
      });
    
      if (confirmacion.isConfirmed) {
        console.log("Datosss ELIMINAR: " + id_proveedor)
        try {
          //const user = JSON.parse(localStorage.getItem('userData')); // Asegúrate de tener el token almacenado
          const response = await fetch('https://190qifrom0.execute-api.us-east-1.amazonaws.com/Development/delete-proveedor-vendedor', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${user.accessToken}`,
            },
            body: JSON.stringify({ id_proveedor: id_proveedor }),
          });
    
          const data = await response.json();
    
          if (response.ok) {
            Swal.fire('¡Eliminado!', data.message || 'Categoría eliminada exitosamente.', 'success');
            // 👇 Aquí puedes volver a cargar las categorías actualizadas
            await cargarProveedores(); // si tienes una función así
          } else {
            Swal.fire('Error', data.error || 'No se pudo eliminar la categoría.', 'error');
          }
        } catch (error) {
          console.error('Error eliminando la categoría:', error);
          Swal.fire('Error', 'Error interno. Intenta más tarde.', 'error');
        }
      }
    };

    // Función para abrir el modal con proveedor seleccionado
    const abrirModal = (proveedor) => {
      setProveedorSeleccionado(proveedor);
      setMostrarModal(true);
    };

    // Función para cerrar el modal
    const cerrarModal = () => {
      setMostrarModal(false);
      setProveedorSeleccionado(null);
    };

    // Función para actualizar el proveedor localmente (sin recargar)
    const actualizarProveedorLocal = () => {
      cargarProveedores(); // 🧠 Vuelve a consultar la página actual del backend
    };


  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4 bg-primary text-white text-center pb-2 pt-2">Mis Proveedores</h2>

      {loading ? (
        <div className="text-center mt-5">
          <div className="spinner-border text-primary" role="status" />
          <p className="mt-3">Cargando proveedores...</p>
        </div>
      ): proveedores.length === 0 ? (
        <div className="text-center">No tienes Proveedores registrados actualmente.</div>
      ) : error ? (
        <div className="alert alert-danger">{error}</div>
      ) : (
        <>
          <div className="row fade-in">
            {proveedores.map((prov) => (
              <div className="col-md-6 col-lg-4 mb-4" key={prov.SK}>
                <div className="card shadow-sm h-100 border-0">
                  <div className="card-body">
                    <h5 className="card-title text-primary fw-bold text-center mb-3">
                      {mostrarTexto(prov.nombre_proveedor, "Proveedor sin nombre")}
                    </h5>

                    <div className="row mb-2">
                      <div className="col-5 fw-semibold text-end">
                        <FaBuilding className="me-2 text-secondary" />
                        Empresa:
                      </div>
                      <div className="col-7">
                        {mostrarTexto(
                          prov.empresa_proveedor,
                          "Sin Información registrada de la empresa"
                        )}
                      </div>
                    </div>

                    <div className="row mb-2">
                      <div className="col-5 fw-semibold text-end">
                        <FaPhone className="me-2 text-secondary" />
                        Teléfono:
                      </div>
                      <div className="col-7">
                        {mostrarTexto(
                          prov.telefono_proveedor,
                          "Sin teléfono registrado"
                        )}
                      </div>
                    </div>

                    <div className="row mb-2">
                      <div className="col-5 fw-semibold text-end">
                        <FaEnvelope className="me-2 text-secondary" />
                        Email:
                      </div>
                      <div className="col-7">
                        {mostrarTexto(
                          prov.email_proveedor,
                          "Sin correo registrado"
                        )}
                      </div>
                    </div>

                    <div className="row mb-2">
                      <div className="col-5 fw-semibold text-end">Estado:</div>
                      <div className="col-7">
                        <span
                          className={`badge ${
                            prov.estado_proveedor === "Activo"
                              ? "bg-success"
                              : "bg-secondary"
                          }`}
                        >
                          {mostrarTexto(prov.estado_proveedor, "Sin estado")}
                        </span>
                      </div>
                    </div>

                    <div className="row mb-2">
                      <div className="col-5 fw-semibold text-end">Descripción:</div>
                      <div className="col-7">
                        {mostrarTexto(
                          prov.descripcion_proveedor,
                          "Sin descripción"
                        )}
                      </div>
                    </div>

                    <div className="row mb-3">
                      <div className="col-5 fw-semibold text-end">Fecha de Creación:</div>
                      <div className="col-7">
                        {new Date(
                          prov.fecha_creacion_Proveedor
                        ).toLocaleString("es-MX", {
                          dateStyle: "medium",
                          timeStyle: "short",
                        })}
                      </div>
                    </div>

                    <div className="row mb-3">
                      <div className="col-5 fw-semibold text-end">Fecha de Modificación:</div>
                      <div className="col-7">
                        {new Date(
                          prov.fecha_modificacion_Proveedor
                        ).toLocaleString("es-MX", {
                          dateStyle: "medium",
                          timeStyle: "short",
                        })}
                      </div>
                    </div>

                    <div className="d-flex justify-content-between">
                      <button className="btn btn-sm btn-outline-primary"
                              onClick={() => abrirModal(prov)}
                      >
                        <FaEdit className="me-1" /> Editar
                      </button>
                      <button 
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => eliminarProveedor(prov.id_Proveedor)}
                      >
                          <FaTrash className="me-1" /> Eliminar
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* ⏮️⏭️ Navegación entre páginas */}
          <div className="d-flex justify-content-between mt-4">
            <button
              className="btn btn-secondary"
              onClick={handleBack}
              disabled={historyKeys.length === 0}
            >
              <FaArrowLeft className="me-1" />
              Anterior
            </button>
            <button
              className="btn btn-primary"
              onClick={handleNext}
              disabled={!lastKey}
            >
              Siguiente <FaArrowRight className="ms-1" />
            </button>
          </div>
        </>
      )}
      {mostrarModal && proveedorSeleccionado && (
        <ModalEditarProveedor
          proveedor={proveedorSeleccionado}
          onClose={cerrarModal}
          onUpdate={actualizarProveedorLocal}
        />
      )}
    </div>
  );
};

export default Ventas_MisProveedores;
