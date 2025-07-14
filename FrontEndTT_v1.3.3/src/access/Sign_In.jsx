import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import Swal from "sweetalert2";

const API_LOGIN =
  "https://190qifrom0.execute-api.us-east-1.amazonaws.com/Development/login";
const API_SAVE_DATA =
  "https://190qifrom0.execute-api.us-east-1.amazonaws.com/Development/save-data";

const Sign_In = ({ onSwitch }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(API_LOGIN, { email, password });

      const { idToken, accessToken, refreshToken } = response.data;

      // 🔹 Decodificar el ID Token para obtener los datos del usuario
      const userPayload = JSON.parse(atob(idToken.split(".")[1]));

      console.log("*******************");
      console.log("Datos del usuario:", userPayload);
      console.log("*******************");

      const userID = userPayload["sub"]; // UUID de Cognito
      const userRole = userPayload["custom:rol"]; // Rol del usuario

      console.log("🔹 UUID de Cognito:", userID);
      console.log("🔹 Rol del usuario:", userRole);

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

      // ✅ Guardamos en el contexto de autenticación
      login(userData);

      // ✅ También lo guardamos en LocalStorage para persistencia
      localStorage.setItem("user", JSON.stringify(userData));

      // 🔹 Enviar datos a la Lambda para verificar/registrar usuario en DynamoDB
      try {
        console.log("🔹 Enviando datos a Lambda save-data...");
        const lambdaResponse = await axios.post(API_SAVE_DATA, {
          UserID: userID,
          TipoOperacion: 1, // Tipo de operación: Registro inicial
        });

        console.log("✅ Respuesta de Lambda:", lambdaResponse.data);
      } catch (error) {
        console.error("❌ Error al llamar a la Lambda:", error);
      }

      // 🎉 Notificación de éxito con SweetAlert
      Swal.fire({
        icon: "success",
        title: "¡Inicio de sesión exitoso!",
        text: "Redirigiendo a tu cuenta...",
        timer: 2000,
        showConfirmButton: false,
      });

      // ✅ Redirigir al usuario según su rol
      setTimeout(() => {
        if (userRole === "Cliente") {
          navigate("/dashboard");
        } else if (userRole === "Vendedor") {
          navigate("/ventas");
        } else if (userRole === "Admin") {
          navigate("/admin");
        } else {
          navigate("/"); // Redirigir a la página de inicio en caso de error
        }
      }, 2000);
    } catch (error) {
      console.error("❌ Error en el login:", error);

      // ❌ Si hay error, mostramos alerta de fallo
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Correo o contraseña incorrectos",
      });
    }
  };

  return (
    <div>
      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          autoComplete="off"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          autoComplete="off"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="button-prueba">
          Iniciar Sesión
        </button>
        <button
          type="button"
          onClick={(e) => onSwitch(2, "Sign_In", "")}
          className="button-prueba"
        >
          Registrarse
        </button>
      </form>
    </div>
  );
};

export default Sign_In;