import { useState, useContext } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { AuthContext } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom"; // Para redirigir a otras páginas
import "bootstrap/dist/css/bootstrap.min.css"; // Bootstrap para estilos

const CambiarCredenciales = () => {
  const navigate = useNavigate(); // Para navegar entre páginas
  const { user } = useContext(AuthContext);

  const [opcion, setOpcion] = useState(""); // Para seleccionar qué actualizar
  const [credenciales, setCredenciales] = useState({
    emailActual: "",
    contraseñaActual: "",
    nuevoEmail: "",
    confirmarNuevoEmail: "",
    nuevaContraseña: "",
    confirmarNuevaContraseña: "",
  });

  const [loading, setLoading] = useState(false); // Spinner al enviar
  const [pageLoading, setPageLoading] = useState(true); // Spinner al cargar la página

  // Simular carga inicial para una mejor UX
  useState(() => {
    setTimeout(() => setPageLoading(false), 800);
  }, []);

  // Expresiones regulares para validaciones
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const passwordRegex =
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[$#&%¡¿?!_*])[A-Za-z\d$#&%¡¿?!_*]{8}$/;

  // Manejo de cambios en los inputs
  const handleChange = (e) => {
    setCredenciales({ ...credenciales, [e.target.name]: e.target.value });
  };

  // Validación del formulario antes de enviarlo
  const validarFormulario = () => {
    const {
      emailActual,
      contraseñaActual,
      nuevoEmail,
      confirmarNuevoEmail,
      nuevaContraseña,
      confirmarNuevaContraseña,
    } = credenciales;

    if (!emailActual || !contraseñaActual) {
      Swal.fire("Error", "El correo y la contraseña actual son obligatorios.", "error");
      return false;
    }

    if (opcion === "email" || opcion === "ambos") {
      if (!emailRegex.test(nuevoEmail) || nuevoEmail !== confirmarNuevoEmail) {
        Swal.fire("Error", "Los correos electrónicos no coinciden o tienen formato incorrecto.", "error");
        return false;
      }
    }

    if (opcion === "contraseña" || opcion === "ambos") {
      if (!passwordRegex.test(nuevaContraseña)) {
        Swal.fire("Error", "La nueva contraseña no cumple con los requisitos de seguridad.", "error");
        return false;
      }
      if (nuevaContraseña !== confirmarNuevaContraseña) {
        Swal.fire("Error", "Las contraseñas nuevas no coinciden.", "error");
        return false;
      }
    }

    return true;
  };

  // Manejo del envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validarFormulario()) return;

    const payload = {
      uuid: user.sub,
      current_email: credenciales.emailActual,
      current_password: credenciales.contraseñaActual,
      new_email:
        opcion === "email" || opcion === "ambos"
          ? credenciales.nuevoEmail
          : undefined,
      new_password:
        opcion === "contraseña" || opcion === "ambos"
          ? credenciales.nuevaContraseña
          : undefined,
    };

    // Confirmación previa con SweetAlert
    const confirmacion = await Swal.fire({
      title: "¿Confirmas los cambios?",
      text: "Verifica bien la información antes de continuar.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, actualizar",
      cancelButtonText: "Cancelar",
    });

    if (!confirmacion.isConfirmed) return;

    setLoading(true); // Activamos el spinner de carga

    try {
      const response = await axios.post(
        "https://190qifrom0.execute-api.us-east-1.amazonaws.com/Development/actualizar-credenciales-usuario",
        payload
      );

      if (response.data && response.data.errorMessage) {
        Swal.fire("Error", response.data.errorMessage, "error");
      } else {
        Swal.fire("¡Éxito!", "Las credenciales fueron actualizadas correctamente.", "success").then(() => {
          navigate("/ventas/mi-cuenta"); // Redirigir después del mensaje
        });
      }
    } catch (error) {
      Swal.fire("Error", error.response?.data?.message || "Hubo un problema al actualizar las credenciales.", "error");
    } finally {
      setLoading(false); // Desactivar el spinner
    }
  };

  // 🔹 Mostrar spinner mientras se carga la página
  if (pageLoading) {
    return (
      <div className="container text-center mt-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
        <p className="mt-3">Cargando página...</p>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <h2 className="mb-4 text-center">Actualizar Credenciales</h2>

      <div className="d-flex justify-content-end">
        <button className="btn btn-secondary" onClick={() => navigate("/ventas/mi-cuenta")}>
          Regresar
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Email y contraseña actual */}
        <div className="mb-3">
          <label>Correo Actual</label>
          <input type="email" className="form-control" name="emailActual" placeholder="Correo actual" required onChange={handleChange} />
        </div>

        <div className="mb-3">
          <label>Contraseña Actual</label>
          <input type="password" className="form-control" name="contraseñaActual" placeholder="Contraseña actual" required onChange={handleChange} />
        </div>

        {/* Dropdown para seleccionar qué actualizar */}
        <div className="mb-3">
          <label>¿Qué deseas actualizar?</label>
          <select className="form-control" value={opcion} onChange={(e) => setOpcion(e.target.value)} required>
            <option value="">Selecciona una opción</option>
            <option value="email">Correo</option>
            <option value="contraseña">Contraseña</option>
            <option value="ambos">Ambos</option>
          </select>
        </div>

        {/* Campos dinámicos */}
        {(opcion === "email" || opcion === "ambos") && (
          <>
            <div className="mb-3">
              <label>Nuevo Correo</label>
              <input type="email" className="form-control" name="nuevoEmail" placeholder="Nuevo correo" onChange={handleChange} />
            </div>
            <div className="mb-3">
              <label>Confirmar Nuevo Correo</label>
              <input type="email" className="form-control" name="confirmarNuevoEmail" placeholder="Confirmar nuevo correo" onChange={handleChange} />
            </div>
          </>
        )}

        {(opcion === "contraseña" || opcion === "ambos") && (
          <>
            <div className="mb-3">
              <label>Nueva Contraseña</label>
              <input type="password" className="form-control" name="nuevaContraseña" placeholder="Nueva contraseña" onChange={handleChange} />
            </div>
            <div className="mb-3">
              <label>Confirmar Nueva Contraseña</label>
              <input type="password" className="form-control" name="confirmarNuevaContraseña" placeholder="Confirmar nueva contraseña" onChange={handleChange} />
            </div>
          </>
        )}

        {loading ? (
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Procesando...</span>
          </div>
        ) : (
          <button type="submit" className="btn btn-success w-100">Actualizar Credenciales</button>
        )}
      </form>
    </div>
  );
};

export default CambiarCredenciales;
