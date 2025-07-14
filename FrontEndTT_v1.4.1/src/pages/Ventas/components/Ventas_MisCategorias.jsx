import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../../context/AuthContext";
import "../Styles/Ventas_MisCategorias.css";
import Swal from 'sweetalert2'
import ModalEditarCategoria from './ModalEditarCategoria';


const Ventas_MisCategorias = () => {
  const [categorias, setCategorias] = useState([]);
  const [lastKey, setLastKey] = useState(null);
  const [prevKeys, setPrevKeys] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [imagenesCargadas, setImagenesCargadas] = useState(false);
  const { user } = useContext(AuthContext);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null);


  const obtenerCategorias = async (lastEvaluatedKey = null) => {
    setCargando(true);
    setImagenesCargadas(false);

    try {
      const headers = {
        Authorization: `Bearer ${user.accessToken}`,
      };

      const body = { uuid: user.sub };
      if (lastEvaluatedKey) body.lastKey = lastEvaluatedKey;

      const response = await axios.post(
        "https://190qifrom0.execute-api.us-east-1.amazonaws.com/Development/category-info-vendedor",
        body,
        { headers }
      );

      const nuevasCategorias = response.data.categorias || [];
      setCategorias(nuevasCategorias);
      setLastKey(response.data.lastKey || null);

      // Cargar imágenes antes de mostrar
      const imagenes = nuevasCategorias.map((cat) => {
        return new Promise((resolve) => {
          const img = new Image();
          img.src = cat.url_imagen_categoria;
          img.onload = resolve;
          img.onerror = resolve;
        });
      });

      await Promise.all(imagenes);
      setImagenesCargadas(true);

      // Pequeño delay para suavidad visual
      setTimeout(() => {
        setCargando(false);
      }, 200);
    } catch (error) {
      console.error("❌ Error al obtener categorías:", error);
      setCargando(false);
    }
  };

  useEffect(() => {
    if (user?.accessToken && user?.sub) {
      obtenerCategorias();
    }
  }, [user]);

  const siguientePagina = () => {
    if (lastKey) {
      setPrevKeys((prev) => [...prev, lastKey]);
      obtenerCategorias(lastKey);
    }
  };

  const paginaAnterior = () => {
    const anterior = [...prevKeys];
    const prevLastKey = anterior[anterior.length - 2] || null;
    anterior.pop();
    setPrevKeys(anterior);
    obtenerCategorias(prevLastKey);
  };

  const eliminarCategoria = async (id_categoria) => {
    const confirmacion = await Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción eliminará la categoría de forma permanente.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    });
  
    if (confirmacion.isConfirmed) {
      console.log("Datosss ELIMINAR: " + id_categoria)
      try {
        //const user = JSON.parse(localStorage.getItem('userData')); // Asegúrate de tener el token almacenado
        const response = await fetch('https://190qifrom0.execute-api.us-east-1.amazonaws.com/Development/delete-category-vendedor', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${user.accessToken}`,
          },
          body: JSON.stringify({ id_categorias: id_categoria }),
        });
  
        const data = await response.json();
  
        if (response.ok) {
          Swal.fire('¡Eliminado!', data.message || 'Categoría eliminada exitosamente.', 'success');
          // 👇 Aquí puedes volver a cargar las categorías actualizadas
          await obtenerCategorias(); // si tienes una función así
        } else {
          Swal.fire('Error', data.error || 'No se pudo eliminar la categoría.', 'error');
        }
      } catch (error) {
        console.error('Error eliminando la categoría:', error);
        Swal.fire('Error', 'Error interno. Intenta más tarde.', 'error');
      }
    }
  };

  const abrirModal = (categoria) => {
    setCategoriaSeleccionada(categoria);
    setMostrarModal(true);
  };
  
  const cerrarModal = () => {
    setMostrarModal(false);
    setCategoriaSeleccionada(null);
  };
  
  const guardarCambiosCategoria = async (datos, imagenNueva) => {
    // Aquí luego conectamos con la lógica de prefirmada y backend
    console.log("📝 Datos actualizados:", datos);
    console.log("📷 Imagen nueva:", imagenNueva);
    Swal.fire("Cambios guardados (modo prueba)", "", "success");
    cerrarModal();
    obtenerCategorias(); // refresca lista
  };
  

  return (
    <div className="AjusteListadoCategorias">
      <div className="container mt-5">
      <h2 className="text-center mb-4 bg-primary text-white text-center pb-2 pt-2">Mis Categorías</h2>

      {cargando ? (
        <div className="container text-center mt-5 spinner-wrapper">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Cargando...</span>
          </div>
          <p className="mt-3">Cargando categorías...</p>
        </div>
      ) : categorias.length === 0 ? (
        <div className="text-center">No tienes categorías registradas.</div>
      ) : (
        <>
          <div className="row row-cols-1 row-cols-md-3 g-4 contenedorListadoCategorias">
            {imagenesCargadas &&
              categorias.map((cat, index) => (
                <div className="col" key={index}>
                  <div className="card h-100 shadow-sm categoria-card animacion-aparecer">
                  <img
                    src={cat.url_imagen_categoria}
                    className="card-img-top object-fit-cover"
                    alt={`Imagen de ${cat.nombre_categoria}`}
                  />
                    <div className="card-body">
                      <h5 className="card-title">{cat.nombre_categoria}</h5>
                      <p className="card-text">{cat.descripcion_categoria}</p>
                      <p className="card-text">
                        <strong>Estado:</strong> {cat.estado_categoria} <br />
                        <small className="text-muted">
                          Creado:{" "}
                          {new Date(cat.fecha_creacion).toLocaleString()}
                        </small>
                        <br />
                        <small className="text-muted">
                          Modificado:{" "}
                          {new Date(cat.fecha_modificacion).toLocaleString()}
                        </small>
                      </p>
                    </div>
                    <div className="card-footer d-flex justify-content-end">
                    <button
                      className="btn btn-warning btn-sm me-2"
                      onClick={() => abrirModal(cat)}
                    >
                      Editar
                    </button>

                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => eliminarCategoria(cat.id_categoria)}
                      >
                        Eliminar
                      </button>
                    </div>
                  </div>
                </div>
              ))}
          </div>

          <div className="d-flex justify-content-between mt-4">
            <button
              className="btn btn-secondary"
              onClick={paginaAnterior}
              disabled={prevKeys.length === 0}
            >
              Página anterior
            </button>
            <button
              className="btn btn-primary"
              onClick={siguientePagina}
              disabled={!lastKey}
            >
              Siguiente página
            </button>
          </div>
        </>
      )}
    </div>

    {mostrarModal && categoriaSeleccionada && (
      <ModalEditarCategoria
        show={mostrarModal}
        onClose={cerrarModal}
        categoria={categoriaSeleccionada}
        onSave={guardarCambiosCategoria}
      />
    )}

    </div>
    
  );
};

export default Ventas_MisCategorias;

