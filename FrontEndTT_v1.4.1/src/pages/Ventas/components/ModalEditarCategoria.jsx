import React, { useContext, useRef, useState } from "react";
import { AuthContext } from "../../../context/AuthContext"; // ✅ Usamos contexto
import axios from "axios";
import Swal from "sweetalert2";
import Spinner from "./Spinner";
import "../Styles/ModalEditarCategoria.css";

const ModalEditarCategoria = ({ show, onClose, categoria, onSave }) => {
  const { user } = useContext(AuthContext); // ✅ Obtenemos el usuario autenticado
  const fileInputRef = useRef(null);

  const [editFields, setEditFields] = useState({
    nombre_categoria: false,
    descripcion_categoria: false,
    estado_categoria: false,
    url_imagen_categoria: false,
  });

  const [formData, setFormData] = useState({
    nombre_categoria: categoria.nombre_categoria,
    descripcion_categoria: categoria.descripcion_categoria,
    estado_categoria: categoria.estado_categoria,
  });

  const [imagen, setImagen] = useState(null);
  const [loading, setLoading] = useState(false);
  const [guardando, setGuardando] = useState(false);
  const [bloqueo, setBloqueo] = useState("Modificar");
  const [banderaBloqueo, setBanderaBloqueo] = useState(false);
  const [bloqueo02, setBloqueo02] = useState("Modificar");
  const [banderaBloqueo02, setBanderaBloqueo02] = useState(false);
  const [bloqueo03, setBloqueo03] = useState("Modificar");
  const [banderaBloqueo03, setBanderaBloqueo03] = useState(false);
  const [bloqueo04, setBloqueo04] = useState("Modificar Imagen");
  const [banderaBloqueo04, setBanderaBloqueo04] = useState(false);
  const [bloqueo05, setBloqueo05] = useState("Imagen bloqueada");
  const [banderaBloqueo05, setBanderaBloqueo05] = useState(false);

  const handleToggleEdit = (field, Campo) => {
    setEditFields((prev) => ({ ...prev, [field]: !prev[field] }));
    
    if(banderaBloqueo && Campo==1){
      setBanderaBloqueo(false)
      setBloqueo("Modificar")
    }else if(!banderaBloqueo && Campo==1){
      setBanderaBloqueo(true)
      setBloqueo("Bloquear")
    }

    if(banderaBloqueo02  && Campo==2){
      setBanderaBloqueo02(false)
      setBloqueo02("Modificar")
    }else if(!banderaBloqueo02  && Campo==2){
      setBanderaBloqueo02(true)
      setBloqueo02("Bloquear")
    }

    if(banderaBloqueo03  && Campo==3){
      setBanderaBloqueo03(false)
      setBloqueo03("Modificar")
    }else if(!banderaBloqueo03  && Campo==3){
      setBanderaBloqueo03(true)
      setBloqueo03("Bloquear")
    }

    if(banderaBloqueo04  && Campo==4){
      setBanderaBloqueo04(false)
      setBloqueo04("Modificar Imagen")
      setBloqueo05("Imagen bloqueada")
    }else if(!banderaBloqueo04 && Campo==4){
      setBanderaBloqueo04(true)
      setBloqueo04("Bloquear  Imagen")
      setBloqueo05("Seleccione la imagen")
    }

    if(banderaBloqueo05  && Campo==5){
      setBanderaBloqueo05(false)
      setBloqueo05("La actualización imagen esta bloqueada")
    }else if(!banderaBloqueo05  && Campo==5){
      setBanderaBloqueo05(true)
      setBloqueo05("Seleccione la imagen")
    }
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) setImagen(file);
  };

  const getFileExtension = (filename) =>
    filename.split(".").pop().toLowerCase();

  const handleGuardarCambios = async () => {
    if (!user) {
      Swal.fire("Error", "Tu sesión ha expirado. Inicia sesión nuevamente.", "error");
      return;
    }

    const cambios = {};

    // Validación de longitud
    if (
      editFields.nombre_categoria &&
      formData.nombre_categoria.length > 50
    ) {
      return Swal.fire(
        "Nombre muy largo",
        "Máximo permitido: 50 caracteres",
        "warning"
      );
    }

    if (
      editFields.descripcion_categoria &&
      formData.descripcion_categoria.length > 200
    ) {
      return Swal.fire(
        "Descripción muy larga",
        "Máximo permitido: 200 caracteres",
        "warning"
      );
    }

    // Detectar qué campos cambiaron
    if (editFields.nombre_categoria)
      cambios.nombre_categoria = formData.nombre_categoria;
    if (editFields.descripcion_categoria)
      cambios.descripcion_categoria = formData.descripcion_categoria;
    if (editFields.estado_categoria)
      cambios.estado_categoria = formData.estado_categoria;
    if (imagen) cambios.url_imagen_categoria = "[imagen_nueva]";

    if (Object.keys(cambios).length === 0) {
      return Swal.fire("Sin cambios", "No realizaste ninguna modificación.", "info");
    }

    // Confirmación
    const confirm = await Swal.fire({
      title: "¿Guardar cambios?",
      html: `<ul>${Object.keys(cambios).map(k => `<li>${k}</li>`).join("")}</ul>`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Sí, guardar",
      cancelButtonText: "Cancelar"
    });

    if (!confirm.isConfirmed) return;

    try {
      setLoading(true);

      // ✅ Si hay imagen, primero genera la URL prefirmada
      if (imagen) {
        const extension = getFileExtension(imagen.name);
        const body = {
          uuid: user.sub,
          extension,
          urlanterior: categoria.url_imagen_categoria
        };

        const prefirmada = await axios.post(
          "https://190qifrom0.execute-api.us-east-1.amazonaws.com/Development/change_imageCategory_s3",
          body,
          {
            headers: { Authorization: `Bearer ${user.accessToken}` }
          }
        );

        if (prefirmada.data && prefirmada.data.url && prefirmada.data.path) {
          console.log("TODO COOL")
          console.log(prefirmada.data)
          //return response.data; // 🔹 Devolvemos la URL prefirmada y el path
          try {
            // Subimos la nueva imagen a S3
            await axios.put(prefirmada.data.url, imagen, {
              headers: { "Content-Type": imagen.type }
            });
            cambios.url_imagen_categoria = prefirmada.data.path;
          } catch (error) {
            console.error("Error al subir la imagen PARTE02:", error);
            Swal.fire("Error", "Hubo un problema al subir la imagen", "error");
            throw error;
          }
        } else {
          console.log("ALGO SE MURIO")
          //throw new Error("Respuesta inesperada al obtener la URL prefirmada.");
        }
      }
      // ✅ Actualizar en DynamoDB
      const payload = {
        id_categoria: categoria.id_categoria,
        ...cambios,
      };

      const response = await axios.post(
        "https://190qifrom0.execute-api.us-east-1.amazonaws.com/Development/update-category-dynamo",
        payload,
        {
          headers: { Authorization: `Bearer ${user.accessToken}` }
        }
      );

      Swal.fire("¡Éxito!", response.data.message || "Categoría actualizada", "success");
      onSave();  // recarga
      onClose(); // cierra modal

    } catch (error) {
      console.error("Error:", error);
      Swal.fire("Error", "No se pudieron guardar los cambios.", "error");
    } finally {
      setLoading(false);
    }
  };

  if (!show) return null;

  function FileUpload() {
    const [fileName, setFileName] = useState("Ningún archivo seleccionado");
    const fileInputRef = useRef(null);
  
    const handleFileChange = (e) => {
      const file = e.target.files[0];
      if (file) {
        setFileName(file.name);
        // Aquí puedes manejar la lógica de subida (handleImageChange)
      } else {
        setFileName("Ningún archivo seleccionado");
      }
    };
  }

  return (
    <>

    {loading && <Spinner />}

    <div className="modal-backdrop-custom">
      <div className="modal d-block" tabIndex="-1">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content p-4">
            <div className="modal-header">
              <h5 className="modal-title">Editar Categoría</h5>
              <button type="button" className="btn-close" onClick={onClose}></button>
            </div>
            <div className="modal-body">
              {/* Campo nombre */}
              <div className="mb-3 d-flex align-items-center contenedorEdicionCategorias">
                <div className="NombreEtiquetaCategoria"><label htmlFor="">Nombre de la categoria</label></div>
                <div className="mb-3 d-flex align-items-center">
                  <input
                    type="text"
                    className="form-control me-2"
                    value={formData.nombre_categoria}
                    onChange={(e) =>
                      handleInputChange("nombre_categoria", e.target.value)
                    }
                    disabled={!editFields.nombre_categoria}
                    maxLength={50}
                  />
                  <button
                    className="btn btn-outline-secondary btn-sm"
                    onClick={() => handleToggleEdit("nombre_categoria",1)}
                  >
                    {bloqueo}
                  </button>
                </div>
              </div>

              {/* Campo descripción */}
              <div className="mb-3 d-flex align-items-center contenedorEdicionCategorias">
                <div className="NombreEtiquetaCategoria"><label htmlFor="">Descripción de la categoria</label></div>
                <div className="mb-3 d-flex align-items-center">
                  <textarea
                    className="form-control me-2"
                    rows="3"
                    value={formData.descripcion_categoria}
                    onChange={(e) =>
                      handleInputChange("descripcion_categoria", e.target.value)
                    }
                    disabled={!editFields.descripcion_categoria}
                    maxLength={200}
                  />
                  <button
                    className="btn btn-outline-secondary btn-sm"
                    onClick={() => handleToggleEdit("descripcion_categoria",2)}
                  >
                    {bloqueo02}
                  </button>
                </div>
              </div>

              {/* Campo estado */}
              <div className="mb-3 d-flex align-items-center contenedorEdicionCategorias">
                <div className="NombreEtiquetaCategoria"><label htmlFor="">Estado Actual de la categoria</label></div>
                <div className="mb-3 d-flex align-items-center">
                  <select
                    className="form-select me-2"
                    value={formData.estado_categoria}
                    onChange={(e) =>
                      handleInputChange("estado_categoria", e.target.value)
                    }
                    disabled={!editFields.estado_categoria}
                  >
                    <option value="Activo">Activo</option>
                    <option value="Inactivo">Inactivo</option>
                  </select>
                  <button
                    className="btn btn-outline-secondary btn-sm"
                    onClick={() => handleToggleEdit("estado_categoria",3)}
                  >
                    {bloqueo03}
                  </button>
                </div>
              </div>

              {/* Imagen */}
              <div className="mb-3">
                <img
                  src={categoria.url_imagen_categoria}
                  alt="Imagen actual"
                  className="img-fluid mb-2 imagenModalCategoria"
                />
                <div className="cambiarImagenCategoria">
                <button
                    className="btn btn-outline-secondary btn-sm"
                    onClick={() => {
                      handleToggleEdit("url_imagen_categoria",4);
                      if (!editFields.url_imagen_categoria)
                        fileInputRef.current.click();
                    }}
                  >
                    {bloqueo04}
                  </button>
                </div>
                <div className="d-flex align-items-center">
                  {/* Input oculto */}
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleImageChange}
                    className="d-none"
                    id="file-upload"
                    disabled={!editFields.url_imagen_categoria}
                  />
                  
                  {/* Botón personalizado */}
                  <label
                    htmlFor="file-upload"
                    className={`btn btn-outline-secondary btn-sm me-2 ${!editFields.url_imagen_categoria ? "disabled" : ""}`}
                  >
                    {bloqueo05}
                  </label>
                  
                  {/* Nombre del archivo (opcional) */}
                  <span>{fileInputRef.current?.files[0]?.name || "Sin archivo"}</span>
                 
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={onClose}>
                Cancelar
              </button>
              <button
                className="btn btn-primary"
                onClick={handleGuardarCambios}
                disabled={loading}
              >
                {"Guardar Cambios"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    </>
  );
};

export default ModalEditarCategoria;

