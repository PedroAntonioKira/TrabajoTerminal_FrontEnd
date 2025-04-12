import { useState, useEffect, useContext } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { AuthContext } from "../../../context/AuthContext"; // Contexto de usuario
import { useNavigate } from "react-router-dom";
//import "../Styles/Ventas_EditarMiCuenta.css"; // Estilos del formulario
import "bootstrap/dist/css/bootstrap.min.css";

const VentasEditarMiCuenta = () => {
  // 🔹 Accedemos al usuario desde el contexto
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  // 🔹 Estados para almacenar datos
  const [formData, setFormData] = useState({
    name: "",
    phone_number: "",
    equivalencia_puntos: "",
  });

  const [loading, setLoading] = useState(true); // Spinner de carga
  const [submitting, setSubmitting] = useState(false); // Spinner para enviar datos

  // 🔹 Estados para habilitar/deshabilitar edición de campos
  const [editFields, setEditFields] = useState({
    name: false,
    phone_number: false,
    equivalencia_puntos: false,
  });

  // 🔹 Obtener datos actuales desde la API
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.post(
          "https://190qifrom0.execute-api.us-east-1.amazonaws.com/Development/user-Info-vendedor",
          { uuid: user?.sub }
        );

        setFormData({
          name: response.data.name || "",
          phone_number: response.data.phone_number?.replace("+52", "") || "",
          equivalencia_puntos: response.data.equivalencia_puntos || "",
        });

      } catch (error) {
        console.error("Error al obtener datos del usuario:", error);
        Swal.fire("Error", "No se pudieron cargar los datos.", "error");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [user]);

  // 🔹 Validaciones de los campos
  const validateFields = () => {
    if (formData.name && formData.name.length > 100) {
      Swal.fire("Error", "El nombre no puede superar los 100 caracteres.", "error");
      return false;
    }
    if (formData.phone_number && !/^\d{10}$/.test(formData.phone_number)) {
      Swal.fire("Error", "El número de teléfono debe tener exactamente 10 dígitos.", "error");
      return false;
    }
    if (formData.equivalencia_puntos && (isNaN(formData.equivalencia_puntos) || formData.equivalencia_puntos < 0 || formData.equivalencia_puntos > 1000000)) {
      Swal.fire("Error", "La equivalencia en puntos debe ser un número entre 0 y 1,000,000.", "error");
      return false;
    }
    return true;
  };

  // 🔹 Manejador de cambios en los inputs
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // 🔹 Manejador para habilitar/deshabilitar edición de campos
  const toggleEdit = (field) => {
    setEditFields({ ...editFields, [field]: !editFields[field] });
  };

  // 🔹 Función para enviar los datos a la API
  const handleSubmit = async () => {
    if (!validateFields()) return;

    Swal.fire({
      title: "Confirmar actualización",
      text: "¿Estás seguro de actualizar los datos?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, actualizar",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        setSubmitting(true); // 🔹 Activamos spinner de carga

        try {
          const response = await axios.post(
            "https://190qifrom0.execute-api.us-east-1.amazonaws.com/Development/update_data_vendedor",
            {
              uuid: user?.sub,
              name: editFields.name ? formData.name : undefined,
              phone_number: editFields.phone_number ? `+52${formData.phone_number}` : undefined,
              equivalencia_puntos: editFields.equivalencia_puntos ? formData.equivalencia_puntos : undefined,
            },
            {
              headers: {
                Authorization: `Bearer ${user?.accessToken}`,
                "Content-Type": "application/json",
              },
            }
          );

          Swal.fire("¡Éxito!", "Tus datos han sido actualizados correctamente.", "success");
          navigate("/ventas/mi-cuenta");
        } catch (error) {
          console.error("Error al actualizar los datos:", error);
          Swal.fire("Error", "Debes activar al menos un campo para poder editar. Desbloquealo si asi lo decides", "error");
        } finally {
          setSubmitting(false); // 🔹 Ocultamos spinner después de procesar
        }
      }
    });
  };

  // 🔹 Si está cargando los datos, mostramos un spinner
  if (loading) {
    return (
      <div className="container text-center mt-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
        <p className="mt-3">Cargando información...</p>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <div className="card shadow-lg">
        <div className="card-header bg-primary text-white text-center">
          <h3>Editar Mi Cuenta</h3>
        </div>
        <div className="card-body">
          {/* 🔹 Campo Nombre */}
          <div className="mb-3">
            <label className="form-label">Nombre</label>
            <div className="input-group">
              <input type="text" className="form-control" name="name" value={formData.name} onChange={handleChange} disabled={!editFields.name} maxLength={100} />
              <button className="btn btn-outline-secondary" type="button" onClick={() => toggleEdit("name")}>{editFields.name ? "Bloquear" : "Editar"}</button>
            </div>
          </div>

          {/* 🔹 Campo Teléfono */}
          <div className="mb-3">
            <label className="form-label">Teléfono</label>
            <div className="input-group">
              <span className="input-group-text">+52</span>
              <input type="text" className="form-control" name="phone_number" value={formData.phone_number} onChange={handleChange} disabled={!editFields.phone_number} maxLength={10} />
              <button className="btn btn-outline-secondary" type="button" onClick={() => toggleEdit("phone_number")}>{editFields.phone_number ? "Bloquear" : "Editar"}</button>
            </div>
          </div>

          {/* 🔹 Campo Equivalencia Puntos */}
          <div className="mb-3">
            <label className="form-label">Equivalencia Puntos</label>
            <div className="input-group">
              <input type="number" className="form-control" name="equivalencia_puntos" value={formData.equivalencia_puntos} onChange={handleChange} disabled={!editFields.equivalencia_puntos} min={0} max={1000000} />
              <button className="btn btn-outline-secondary" type="button" onClick={() => toggleEdit("equivalencia_puntos")}>{editFields.equivalencia_puntos ? "Bloquear" : "Editar"}</button>
            </div>
          </div>
        </div>

        {/* 🔹 Botón para enviar cambios */}
        <div className="card-footer text-center">
          {submitting ? (
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Procesando...</span>
            </div>
          ) : (
            <button className="btn btn-success" onClick={handleSubmit}>Guardar Cambios</button>
          )}
          <button className="btn btn-secondary ms-2" onClick={() => navigate("/ventas/mi-cuenta")}>Cancelar</button>
        </div>
      </div>
    </div>
  );
};

export default VentasEditarMiCuenta;
