/** VENTAS_MISPRODUCTOS.JSX
 * Componente principal que muestra los productos del vendedor
 * con paginación, cards resumidas, modal de detalles e imagen.
 */

import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";
//import { obtenerProductosPorVendedor } from "./useNuevoProducto";
import { obtenerProductosPorVendedor } from "../../../api/apiProductos";
import ProductoCard from "./ProductoCard";
import ModalDetallesProducto from "./ModalDetallesProducto";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const Ventas_MisProductos = () => {
  const { user } = useContext(AuthContext);

  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastKey, setLastKey] = useState(null);
  const [historyKeys, setHistoryKeys] = useState([]);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [mostrarModal, setMostrarModal] = useState(false);

  useEffect(() => {
    if (user?.sub && user?.accessToken) {
      cargarProductos();
    }
  }, [user?.sub, user?.accessToken]);

  const cargarProductos = async (key = null, retroceder = false) => {
    setLoading(true);
    setError(null);
    try {
      const data = await obtenerProductosPorVendedor(user.accessToken, user.sub, key);
      setProductos(data.proveedores || []);

      if (!retroceder && lastKey !== null) {
        setHistoryKeys((prev) => [...prev, lastKey]);
      }

      if (data.lastKey) {
        setLastKey(data.lastKey);
      } else {
        setLastKey(null);
      }
    } catch (err) {
      console.error("❌ Error al cargar productos:", err);
      setError("Ocurrió un error al obtener los productos.");
    } finally {
      setLoading(false);
    }
  };

  const retrocederPagina = () => {
    const newHistory = [...historyKeys];
    const previousKey = newHistory.pop();
    setHistoryKeys(newHistory);
    cargarProductos(previousKey, true);
  };

  const avanzarPagina = () => {
    cargarProductos(lastKey);
  };

  const abrirModalDetalles = (producto) => {
    setProductoSeleccionado(producto);
    setMostrarModal(true);
  };

  const cerrarModal = () => {
    setMostrarModal(false);
    setProductoSeleccionado(null);
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Mis Productos</h2>

      {loading ? (
        <div className="text-center mt-5">
          <div className="spinner-border text-primary" role="status" />
          <p className="mt-3">Cargando productos...</p>
        </div>
      ) : error ? (
        <div className="alert alert-danger">{error}</div>
      ) : productos.length === 0 ? (
        <div className="alert alert-warning">No se encontraron productos.</div>
      ) : (
        <>
          <div className="row">
            {productos.map((producto) => (
              <div className="col-md-4 mb-4" key={producto.id_Product}>
                <ProductoCard
                  producto={producto}
                  onVerDetalles={() => abrirModalDetalles(producto)}
                />
              </div>
            ))}
          </div>

          <div className="d-flex justify-content-center mt-4">
            {historyKeys.length > 0 && (
              <button className="btn btn-outline-primary mx-2" onClick={retrocederPagina}>
                <FaArrowLeft className="me-1" />
                Anterior
              </button>
            )}
            {lastKey && (
              <button className="btn btn-outline-primary mx-2" onClick={avanzarPagina}>
                Siguiente
                <FaArrowRight className="ms-1" />
              </button>
            )}
          </div>
        </>
      )}

      {/* Modal de detalles del producto */}
      {productoSeleccionado && (
        <ModalDetallesProducto
          producto={productoSeleccionado}
          mostrar={mostrarModal}
          cerrarModal={cerrarModal}
        />
      )}
    </div>
  );
};

export default Ventas_MisProductos;
