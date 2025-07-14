import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";
import axios from "axios";
import Swal from "sweetalert2";
import Spinner from "./Spinner";
import "../Styles/ModalEditarProveedor.css"; // Agregaremos este archivo en el paso 2

const ModalEditarProveedor = ({ proveedor, onClose, onUpdate }) => {
  const { user } = useContext(AuthContext);

  // Estados internos del proveedor (copiamos para evitar modificar el original directamente)
  const [form, setForm] = useState({});
  const [enabledFields, setEnabledFields] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // 🔄 Al abrir el modal, inicializamos el formulario
  useEffect(() => {
    console.log("Modal Proveedor_")
    console.log(proveedor)
    setForm({
      nombre_Proveedor: proveedor.nombre_proveedor || "",
      telefono_Proveedor: proveedor.telefono_proveedor || "",
      estado_Proveedor: proveedor.estado_proveedor || "Activo",
      empresa_Proveedor: proveedor.empresa_proveedor || "",
      descripcion_proveedor: proveedor.descripcion_proveedor || "",
      email_Proveedor: proveedor.email_proveedor || "",
    });
    setEnabledFields({});
  }, [proveedor]);

  // 🧠 Función para habilitar/deshabilitar campos
  const toggleField = (field) => {
    setEnabledFields((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  // ✏️ Función para cambiar valores del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // 🧠 Verificamos si al menos un campo ha cambiado
  const hasChanges = Object.keys(form).some(
    (key) => form[key] !== (proveedor[key] || "")
  );

  // 🧠 Validaciones antes de actualizar
  const validar = () => {
    const errores = [];

    if (!form.nombre_Proveedor.trim()) errores.push("Nombre del proveedor");
    if (!form.descripcion_proveedor.trim())
      errores.push("Descripción del proveedor");

    if (form.email_Proveedor && !/^[\w.-]+@[\w.-]+\.\w{2,4}$/.test(form.email_Proveedor)) {
      errores.push("Correo electrónico con formato válido");
    }

    if (
      form.telefono_Proveedor &&
      !/^\d{10}$/.test(form.telefono_Proveedor)
    ) {
      errores.push("Teléfono con 10 dígitos numéricos");
    }

    if (form.nombre_Proveedor.length > 50)
      errores.push("Nombre del proveedor (máximo 50 caracteres)");
    if (form.empresa_Proveedor.length > 50)
      errores.push("Empresa del proveedor (máximo 50 caracteres)");
    if (form.descripcion_proveedor.length > 200)
      errores.push("Descripción del proveedor (máximo 200 caracteres)");

    return errores;
  };

  // 🧪 Función para actualizar los datos
  const handleUpdate = async () => {
    const errores = validar();

    if (errores.length > 0) {
      Swal.fire({
        icon: "error",
        title: "Campos inválidos",
        html: errores.map((e) => `<p>${e}</p>`).join(""),
      });
      return;
    }

    const cambios = Object.keys(form)
      .filter((key) => form[key] !== (proveedor[key] || ""))
      .map((key) => `<li><strong>${key}:</strong> ${form[key] || "Vacío"}</li>`)
      .join("");

    const confirm = await Swal.fire({
      icon: "question",
      title: "¿Deseas actualizar estos datos?",
      html: `<ul>${cambios}</ul>`,
      showCancelButton: true,
      confirmButtonText: "Sí, actualizar",
      cancelButtonText: "Cancelar",
    });

    if (!confirm.isConfirmed) return;

    // 🌀 Mostramos spinner
    setIsLoading(true);
    try {
      const body = {
        id_Proveedor: proveedor.id_Proveedor,
        ...form,
      };

      const res = await axios.post(
        "https://190qifrom0.execute-api.us-east-1.amazonaws.com/Development/update-proveedor-dynamo",
        body,
        {
          headers: {
            Authorization: `Bearer ${user.accessToken}`,
          },
        }
      );

      if (res.status === 200) {
        Swal.fire("¡Actualizado!", res.data?.mensaje || "Cambios guardados.", "success");
        onUpdate(); // Notifica al padre para recargar la lista
        onClose();  // Cierra el modal
      } else {
        throw new Error("No se recibió confirmación válida");
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "No se pudo actualizar el proveedor.", "error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <h5 className="mb-3 text-center">Editar proveedor</h5>

        {isLoading && <Spinner />}

        <div className={`formulario ${isLoading ? "disabled" : ""}`}>
          {[
            { label: "Nombre", name: "nombre_Proveedor", required: true },
            { label: "Teléfono", name: "telefono_Proveedor" },
            { label: "Email", name: "email_Proveedor" },
            { label: "Empresa", name: "empresa_Proveedor" },
            { label: "Descripción", name: "descripcion_proveedor", isTextarea: true, required: true },
          ].map((field) => (
            <div className="mb-3 d-flex align-items-start" key={field.name}>
              <div className="w-100">
                <label className="form-label fw-semibold">
                  {field.label}:
                </label>
                {field.isTextarea ? (
                  <textarea
                    name={field.name}
                    value={form[field.name]}
                    onChange={handleChange}
                    disabled={!enabledFields[field.name]}
                    className="form-control"
                    maxLength={field.name === "descripcion_proveedor" ? 200 : undefined}
                  />
                ) : (
                  <input
                    type="text"
                    name={field.name}
                    value={form[field.name]}
                    onChange={handleChange}
                    disabled={!enabledFields[field.name]}
                    className="form-control"
                    maxLength={field.name.includes("Proveedor") ? 50 : undefined}
                  />
                )}
              </div>
              <button
                className="btn btn-sm btn-outline-secondary ms-2 mt-4"
                onClick={() => toggleField(field.name)}
              >
                {enabledFields[field.name] ? "🔒" : "✏️"}
              </button>
            </div>
          ))}

          {/* Estado (select) */}
          <div className="mb-3 d-flex align-items-start">
            <div className="w-100">
              <label className="form-label fw-semibold">Estado:</label>
              <select
                name="estado_Proveedor"
                value={form.estado_Proveedor}
                onChange={handleChange}
                disabled={!enabledFields.estado_Proveedor}
                className="form-select"
              >
                <option value="Activo">Activo</option>
                <option value="Inactivo">Inactivo</option>
              </select>
            </div>
            <button
              className="btn btn-sm btn-outline-secondary ms-2 mt-4"
              onClick={() => toggleField("estado_Proveedor")}
            >
              {enabledFields.estado_Proveedor ? "🔒" : "✏️"}
            </button>
          </div>

          {/* Botones */}
          <div className="d-flex justify-content-between">
            <button className="btn btn-danger" onClick={onClose}>
              Cancelar
            </button>
            <button
              className="btn btn-success"
              onClick={handleUpdate}
              disabled={!hasChanges}
            >
              Actualizar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalEditarProveedor;
