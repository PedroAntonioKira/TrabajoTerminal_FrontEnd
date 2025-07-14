// 📦 Importaciones necesarias para React y navegación
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { FaEnvelope, FaLock, FaSignInAlt, FaEye, FaEyeSlash } from "react-icons/fa";

// 🎯 Importar contexto de autenticación y funciones de API
import { AuthContext } from "../context/AuthContext";
import { loginUser, obtenerInformacionUsuario } from "../api/auth";

// 🎨 Estilos CSS personalizados
import "../access/stylesAccess/Sign_In.css";

function Sign_In() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  // 🔸 Estados para correo, contraseña y visibilidad
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [verPassword, setVerPassword] = useState(false); // 👁 Estado para mostrar u ocultar contraseña

  // 🔍 Validación básica antes de enviar
  const validarFormulario = () => {
    if (!email || !password) {
      Swal.fire("Campos vacíos", "Por favor, completa todos los campos", "warning");
      return false;
    }
    return true;
  };

  // 🧠 Lógica principal del login
  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validarFormulario()) return;

    try {
      // 🔐 Llamar a la Lambda de login para obtener tokens
      const { idToken, accessToken, refreshToken } = await loginUser(email, password);

      // 🔓 Decodificar el ID token (JWT) para extraer datos del usuario
      const userPayload = JSON.parse(atob(idToken.split(".")[1]));

      const userID = userPayload["sub"]; // UUID
      const userRole = userPayload["custom:rol"]; // Rol
      const userData = {
        email,
        accessToken,
        idToken,
        refreshToken,
        sub: userID,
        role: userRole,
        name: userPayload["name"],
        phone_number: userPayload["phone_number"],
        fecha_creacion: userPayload["custom:fecha_creacion"],
        fecha_modificacion: userPayload["custom:fecha_modificacion"],
      };

      // 🔑 Guardar en contexto y LocalStorage
      login(userData);
      localStorage.setItem("user", JSON.stringify(userData));

      // 🔄 Llamar a Lambda para registrar/validar en DynamoDB
      try {
        await obtenerInformacionUsuario(accessToken, idToken, 1, userID);
      } catch (error) {
        console.error("❌ Error al registrar en DynamoDB:", error);
      }

      // 🎉 Notificación de éxito
      Swal.fire({
        icon: "success",
        title: "¡Inicio de sesión exitoso!",
        text: "Redirigiendo a tu cuenta...",
        timer: 2000,
        showConfirmButton: false,
      });

      // 🚀 Redirección según rol
      setTimeout(() => {
        if (userRole === "Cliente") navigate("/dashboard");
        else if (userRole === "Vendedor") navigate("/ventas");
        else if (userRole === "Admin") navigate("/admin");
        else navigate("/");
      }, 2000);
    } catch (error) {
      console.error("❌ Error en login:", error);
      Swal.fire("Error", "Correo o contraseña incorrectos", "error");
    }
  };

  return (
    <div className="form-container">
      <h2><FaSignInAlt /> Iniciar Sesión</h2>

      <form onSubmit={handleLogin} className="form-login">

        {/* 📧 Campo de correo con icono a la izquierda */}
        <div className="input-group mb-3">
          <span className="input-group-text">
            <FaEnvelope />
          </span>
          <input
            type="email"
            className="form-control"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="off"
          />
        </div>

        {/* 🔒 Campo de contraseña con icono y ojo */}
        <div className="input-group mb-3">
          <span className="input-group-text">
            <FaLock />
          </span>
          <input
            type={verPassword ? "text" : "password"}
            className="form-control"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="off"
          />
          <span
            className="input-group-text btn-eye-toggle"
            onClick={() => setVerPassword(!verPassword)}
            style={{ cursor: "pointer" }}
          >
            {verPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        {/* 🎯 Botones de acción */}
        <div className="botones_login">
          <button type="submit" className="btn btn-success">Iniciar Sesión</button>
          <button type="button" className="btn btn-primary" onClick={() => navigate("/registro")}>Registrarme</button>
          <button type="button" className="btn btn-info" onClick={() => navigate("/verificar-correo")}>Validar Token</button>
          <button type="button" className="btn btn-warning" onClick={() => navigate("/reenviar-confirmacion")}>Reenviar Token</button>
          <button type="button" className="btn btn-secondary" onClick={() => navigate("/olvide-password")}>Recuperar Contraseña</button>
        </div>
      </form>

    </div>
  );
}

export default Sign_In;
