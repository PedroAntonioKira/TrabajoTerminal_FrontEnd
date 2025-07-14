import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";
import axios from "axios";
import Swal from "sweetalert2";

const Ventas_NuevoProveedor = () => {
  // 🔐 Obtenemos el usuario autenticado (accessToken y sub como UUID)
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  // 📝 Estado del formulario
  const [formData, setFormData] = useState({
    nombre_proveedor: "",
    telefono_proveedor: "",
    estado_proveedor: "Activo",
    empresa_proveedor: "",
    descripcion_proveedor: "",
    email_proveedor: ""
  });

  // 🔄 Estado para mostrar spinner de carga
  const [loading, setLoading] = useState(false);

  // 🧠 Función para validar campos del formulario
  const validarFormulario = () => {
    const alfanumericoRegex = /^[a-zA-Z0-9\s.,áéíóúÁÉÍÓÚñÑ-]+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const telefonoRegex = /^[0-9]{10}$/;

    if (!formData.nombre_proveedor.trim() || !formData.descripcion_proveedor.trim()) {
      Swal.fire("Campos obligatorios", "Por favor completa todos los campos obligatorios", "warning");
      return false;
    }

    if (!alfanumericoRegex.test(formData.nombre_proveedor) || formData.nombre_proveedor.length > 50) {
      Swal.fire("Nombre inválido", "El nombre debe ser alfanumérico y máximo de 50 caracteres", "error");
      return false;
    }

    if (formData.empresa_proveedor && (!alfanumericoRegex.test(formData.empresa_proveedor) || formData.empresa_proveedor.length > 50)) {
      Swal.fire("Empresa inválida", "La empresa debe ser alfanumérica y máximo de 50 caracteres", "error");
      return false;
    }

    if (!alfanumericoRegex.test(formData.descripcion_proveedor) || formData.descripcion_proveedor.length > 200) {
      Swal.fire("Descripción inválida", "La descripción debe ser alfanumérica y máximo de 200 caracteres", "error");
      return false;
    }

    if (formData.telefono_proveedor && !telefonoRegex.test(formData.telefono_proveedor)) {
      Swal.fire("Teléfono inválido", "El teléfono debe contener exactamente 10 dígitos", "error");
      return false;
    }

    if (formData.email_proveedor && !emailRegex.test(formData.email_proveedor)) {
      Swal.fire("Email inválido", "Ingresa un correo electrónico válido", "error");
      return false;
    }

    return true;
  };

  // 💾 Función para enviar el formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validarFormulario()) return;

    const body = {
      uuid: user.sub,
      nombre_proveedor: formData.nombre_proveedor.trim(),
      descripcion_proveedor: formData.descripcion_proveedor.trim(),
      estado_proveedor: formData.estado_proveedor,
      empresa_proveedor: formData.empresa_proveedor?.trim() || undefined,
      telefono_proveedor: formData.telefono_proveedor?.trim() || undefined,
      email_proveedor: formData.email_proveedor?.trim() || undefined
    };

    try {
      setLoading(true); // ⏳ Mostramos spinner
      const response = await axios.post(
        "https://190qifrom0.execute-api.us-east-1.amazonaws.com/Development/register-proveedor-dynamo",
        body,
        {
          headers: {
            Authorization: `Bearer ${user.accessToken}`,
          },
        }
      );
      setLoading(false);

      Swal.fire("Proveedor registrado", response.data.message || "Registro exitoso", "success").then(() => {
        navigate("/ventas/mis-proveedores"); // ✅ Redirección
        //navigate("/ventas/mis-categorias");
      });
    } catch (error) {
      setLoading(false);
      console.error("Error al registrar proveedor:", error);
      Swal.fire("Error", error.response?.data?.message || "Ocurrió un error al registrar el proveedor", "error");
    }
  };

  // ✍️ Manejamos cambios en el formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="container mt-0">
      <h2 className="text-center mb-4 bg-primary text-white text-center pb-2 pt-2">Crear Nuevo proveedor</h2>

      {loading ? (
        // 🔄 Spinner de carga
        <div className="container text-center mt-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Cargando...</span>
          </div>
          <p className="mt-3">Registrando proveedor...</p>
        </div>
      ) : (
        // 📝 Formulario de registro
        <form onSubmit={handleSubmit} className="row g-3">
          <div className="col-md-6">
            <label className="form-label">Nombre del proveedor *</label>
            <input
              type="text"
              className="form-control"
              name="nombre_proveedor"
              value={formData.nombre_proveedor}
              onChange={handleChange}
              required
              maxLength={50}
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">Empresa (opcional)</label>
            <input
              type="text"
              className="form-control"
              name="empresa_proveedor"
              value={formData.empresa_proveedor}
              onChange={handleChange}
              maxLength={50}
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">Teléfono (opcional)</label>
            <input
              type="text"
              className="form-control"
              name="telefono_proveedor"
              value={formData.telefono_proveedor}
              onChange={handleChange}
              placeholder="Ej. 5512345678"
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">Email (opcional)</label>
            <input
              type="email"
              className="form-control"
              name="email_proveedor"
              value={formData.email_proveedor}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">Estado *</label>
            <select
              className="form-select"
              name="estado_proveedor"
              value={formData.estado_proveedor}
              onChange={handleChange}
              required
            >
              <option value="Activo">Activo</option>
              <option value="Inactivo">Inactivo</option>
            </select>
          </div>

          <div className="col-md-12">
            <label className="form-label">Descripción *</label>
            <textarea
              className="form-control"
              name="descripcion_proveedor"
              rows="3"
              maxLength={200}
              value={formData.descripcion_proveedor}
              onChange={handleChange}
              required
            ></textarea>
          </div>

          <div className="col-12 text-center">
            <button type="submit" className="btn btn-primary mt-3">
              Registrar proveedor
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default Ventas_NuevoProveedor;
