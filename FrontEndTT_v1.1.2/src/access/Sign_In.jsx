import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import Swal from "sweetalert2";

const API_URL = "https://190qifrom0.execute-api.us-east-1.amazonaws.com/Development/login";

const Sign_In = ({ onSwitch }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext); // Obtenemos la función login del contexto
  const navigate = useNavigate(); // Para redirigir al usuario

  const handleLogin = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post(
        "https://190qifrom0.execute-api.us-east-1.amazonaws.com/Development/login",
        { email, password }
      );
  
      const { idToken, accessToken, refreshToken ,} = response.data;
  
      // 🔹 Decodificar el ID Token para obtener los datos del usuario
      const userPayload = JSON.parse(atob(idToken.split(".")[1]));

      console.log("*******************")
      console.log(userPayload)
      console.log("*******************")
      console.log(userPayload["custom:rol"])
      console.log("*******************")
      const payload = JSON.parse(atob(accessToken.split(".")[1])); // Decodificar token
      console.log(payload)
      console.log(payload.exp)
      //console.log(payload.exp * 1000)
      console.log("%%%%%%%%%%%%%%%%%%%%%")

      //const expTime = payload.exp * 1000;
  
      const userData = {
        email,
        role: userPayload["custom:rol"], // Extraemos el rol desde Cognito
        accessToken,
        idToken,
        refreshToken,
      };
  
      // ✅ Guardamos en el contexto de autenticación
      login(userData);
  
      // ✅ También lo guardamos en LocalStorage para que persista la sesión
      localStorage.setItem("user", JSON.stringify(userData));
  
      // 🎉 Notificación de éxito con SweetAlert
      Swal.fire({
        icon: "success",
        title: "¡Inicio de sesión exitoso!",
        text: "Redirigiendo a tu cuenta...",
        timer: 2000,
        showConfirmButton: false,
      });
  
      // ✅ Redirigir al usuario después de 2 segundos
      setTimeout(() => {
        if (userData.role === "Cliente") {
          navigate("/dashboard");
        } else if (userData.role === "Vendedor") {
          navigate("/ventas");
        } else if (userData.role === "Admin") {
          navigate("/admin");
        } else {
          navigate("/"); // Redirigir a la página de inicio en caso de error
        }
      }, 2000);
  
    } catch (error) {
      console.error("Error en el login:", error);
  
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
        <h1>Email: "{email}"</h1>
        <h1>Password: "{password}"</h1>
        <button type="submit" className="button-prueba">
          Iniciar Sesión
        </button>
        <button type="button" onClick={(e)=>{onSwitch(2, "Sign_In","")}} className='button-prueba'>
          Registrarse
        </button>
      </form>
    </div>
  );
};

export default Sign_In;

