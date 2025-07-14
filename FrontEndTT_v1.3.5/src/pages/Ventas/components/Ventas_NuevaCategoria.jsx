import React, { useState, useContext } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { AuthContext } from "../../../context/AuthContext"; // Contexto de usuario
import { useNavigate } from "react-router-dom";

const Ventas_NuevaCategoria = () => {
  const navigate = useNavigate();
  // **Obtenemos el usuario autenticado del contexto**
  const { user } = useContext(AuthContext);
  const uuid = user?.sub; // Ahora sí obtiene el identificador correcto

  // **Estados para los valores del formulario**
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [imagen, setImagen] = useState(null);
  const [cargando, setCargando] = useState(false);

  // **Función para manejar la selección de imagen**
  const handleImagenSeleccionada = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // 🔹 Validar que sea una imagen permitida
    const extension = file.name.split(".").pop().toLowerCase();
    const extensionesPermitidas = ["png", "jpg", "jpeg", "svg", "gif", "webp"];
    if (!extensionesPermitidas.includes(extension)) {
      Swal.fire("Error", "Formato de imagen no permitido", "error");
      return;
    }

    setImagen(file);
  };

  // **Función para validar el formulario antes de enviar**
  const validarFormulario = () => {
    if (!nombre || !descripcion || !imagen) {
      Swal.fire("Error", "Todos los campos son obligatorios", "error");
      return false;
    }
    if (nombre.length > 50) {
      Swal.fire("Error", "El nombre no debe superar los 50 caracteres", "error");
      return false;
    }
    if (descripcion.length > 200) {
      Swal.fire("Error", "La descripción no debe superar los 200 caracteres", "error");
      return false;
    }
    return true;
  };

  // **Función para obtener la URL prefirmada de S3**
  const obtenerURLPrefirmada = async () => {
    try {
      const extension = imagen.name.split(".").pop().toLowerCase();
      console.log("EXTENSIONNNN:")
      console.log(extension)
      console.log("SUB UUID:")
      console.log(uuid)
      const response = await axios.post(
        "https://190qifrom0.execute-api.us-east-1.amazonaws.com/Development/upload_imageCategory_s3",
        { uuid, extension },
        { headers: { Authorization: `Bearer ${user.accessToken}` } }
      );

      if (response.data && response.data.url && response.data.path) {
        return response.data; // 🔹 Devolvemos la URL prefirmada y el path
      } else {
        throw new Error("Respuesta inesperada al obtener la URL prefirmada.");
      }
    } catch (error) {
      console.error("Error al obtener la URL prefirmada:", error);
      Swal.fire("Error", "No se pudo obtener la URL prefirmada. Intenta de nuevo.", "error");
      return null; // 🔹 Si hay error, devolvemos null
    }
  };

  // **Función para subir la imagen a S3**
  const subirImagenAS3 = async (url) => {
    try {
      await axios.put(url, imagen, {
        headers: { "Content-Type": imagen.type },
      });
    } catch (error) {
      console.error("Error al subir la imagen:", error);
      Swal.fire("Error", "Hubo un problema al subir la imagen", "error");
      throw error;
    }
  };

  // **Función para registrar la categoría en DynamoDB**
  const registrarCategoriaEnDynamoDB = async (path) => {
    try {
      const response = await axios.post(
        "https://190qifrom0.execute-api.us-east-1.amazonaws.com/Development/register-category-dynamo",
        {
          uuid,
          nombre_categoria: nombre,
          descripcion_categoria: descripcion,
          estado_categoria: "Activo",
          url_imagen_categoria: path, // 🔹 Usamos el path devuelto por S3
        },
        { headers: { Authorization: `Bearer ${user.accessToken}` } }
      );

      if (response.status === 200) {
        return true;
      } else {
        throw new Error("Error al registrar la categoría.");
      }
    } catch (error) {
      console.error("Error al registrar la categoría:", error);
      Swal.fire("Error", "No se pudo registrar la categoría", "error");
      throw error;
    }
  };

  // **Función principal para manejar la creación de la categoría**
  const handleCrearCategoria = async () => {
    if (!validarFormulario()) return;
    setCargando(true);
    console.log("DATOSSSSCATEGORYYY")
    console.log(user)
    try {
      // 🔹 **Paso 1: Obtener la URL prefirmada**
      const result = await obtenerURLPrefirmada();
      if (!result) {
        setCargando(false);
        return;
      }

      const { url, path } = result;

      // 🔹 **Paso 2: Subir la imagen a S3**
      await subirImagenAS3(url);

      // 🔹 **Paso 3: Registrar la categoría en DynamoDB**
      await registrarCategoriaEnDynamoDB(path);

      // 🔹 **Paso 4: Mostrar mensaje de éxito y redirigir**
      Swal.fire("¡Éxito!", "Categoría creada con éxito", "success").then(() => {
        navigate("/ventas/mis-categorias");
      });

    } catch (error) {
      Swal.fire("Error", "Hubo un problema al crear la categoría", "error");
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="container mt-0">
      <h2 className="mb-4 bg-primary text-white text-center pb-2 pt-2">Crear Nueva Categoría</h2>
      <div className="card p-4">
        <div className="mb-3">
          <label className="form-label">Nombre de la Categoría</label>
          <input
            type="text"
            className="form-control"
            maxLength="50"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Descripción</label>
          <textarea
            className="form-control"
            maxLength="200"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            required
          ></textarea>
        </div>

        <div className="mb-3">
          <label className="form-label">Imagen de la Categoría</label>
          <input
            type="file"
            className="form-control"
            accept="image/png, image/jpeg, image/jpg, image/svg, image/gif, image/webp"
            onChange={handleImagenSeleccionada}
            required
          />
        </div>

        {/* 🔹 Botón con Spinner cuando se está cargando */}
        <div className="text-center">
          {cargando ? (
            <div>
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Cargando...</span>
              </div>
              <p className="mt-3">Procesando...</p>
            </div>
          ) : (
            <button className="btn btn-primary" onClick={handleCrearCategoria}>
              Crear Categoría
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Ventas_NuevaCategoria;
