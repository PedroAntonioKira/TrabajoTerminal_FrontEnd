import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const DebugSession = () => {
  const { user } = useContext(AuthContext);
  const [remainingTime, setRemainingTime] = useState(0);
  const [sessionStartTime, setSessionStartTime] = useState(null);
  const [expirationTime, setExpirationTime] = useState(null);

  useEffect(() => {
    if (user && user.accessToken) {
      try {
        const payload = JSON.parse(atob(user.accessToken.split(".")[1]));
        const expTime = payload.exp * 1000; // Convertimos segundos a milisegundos
        const sessionStart = new Date(payload.auth_time * 1000); // Hora de inicio
        const timeLeft = expTime - Date.now(); // Tiempo restante en ms

        setSessionStartTime(sessionStart.toLocaleString());
        setExpirationTime(new Date(expTime).toLocaleString());
        setRemainingTime(timeLeft);

        // Actualizar cada segundo
        const interval = setInterval(() => {
          setRemainingTime(expTime - Date.now());
        }, 1000);

        return () => clearInterval(interval); // Limpiar intervalo cuando cambie el componente
      } catch (error) {
        console.error("Error al decodificar el token:", error);
      }
    }
  }, [user]);

  return (
    <div style={{ border: "2px solid red", padding: "10px", margin: "10px" }}>
      <h1>⏳ Inicio de sesión: {sessionStartTime || "No disponible"}</h1>
      <h2>⌛ Expira en: {expirationTime || "No disponible"}</h2>
      <h3>
        ⏱️ Tiempo restante: {remainingTime > 0 ? (remainingTime / 1000).toFixed(2) + " segundos" : "Expirado"}
      </h3>
    </div>
  );
};

export default DebugSession;
