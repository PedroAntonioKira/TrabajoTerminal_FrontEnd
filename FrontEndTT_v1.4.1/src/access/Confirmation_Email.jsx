import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import Swal from "sweetalert2";
import { confirmUser } from "../api/confirmUser";
import "./stylesAccess/Confirmation_Email.css"

const Confirmation_Email = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const userData = location.state?.userData;

  const [email, setEmail] = useState(userData?.email || "");
  const [isReadOnly, setIsReadOnly] = useState(!!userData?.email);
  const [token, setToken] = useState("");

  const handleValidateToken = async () => {
    if (!email || !token) {
      Swal.fire({
        icon: "warning",
        title: "Campos vacíos",
        text: "Por favor llena el correo y el token.",
      });
      return;
    }

    try {
      const result = await confirmUser(email, token);
      console.log("✅ Confirmación:", result);

      Swal.fire({
        icon: "success",
        title: "¡Cuenta confirmada!",
        text: "Tu cuenta ha sido activada correctamente.",
      });

      setTimeout(() => {
        navigate("/"); // Puedes redirigir al login
      }, 2000);
    } catch (error) {
      console.error("❌ Error al confirmar:", error);
      Swal.fire({
        icon: "error",
        title: "Error al validar",
        text:
          error?.response?.data || "No se pudo validar el token. Intenta de nuevo.",
      });
    }
  };

  return (
    <div className="EmailRegistro"> 
      <div className="contenedorRegistro">
        <div className="formulario fade-in">
          <h2>Validación de correo electrónico</h2>
          <form>
            <div className="form-group">
              <label>Correo electrónico:</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                readOnly={isReadOnly}
                className="form-control"
                placeholder="Ingresa tu correo"
              />
            </div>

            <div className="form-group mt-3">
              <label>Token de confirmación:</label>
              <input
                type="text"
                className="form-control"
                placeholder="Ingresa el token"
                value={token}
                onChange={(e) => setToken(e.target.value)}
              />
            </div>

            <div className="botones_validate">
              <button
                type="button"
                className="btn btn-success"
                onClick={handleValidateToken}
              >
                Validar token
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => navigate("/")}
              >
                Cancelar
              </button>

              <button type="button" className="btn btn-warning" onClick={() => navigate("../reenviar-confirmacion")}>
                Reenviar Token
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Confirmation_Email;



