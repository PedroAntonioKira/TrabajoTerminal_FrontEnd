import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../../context/AuthContext"; // Importamos el contexto
import Swal from "sweetalert2"; // Para mostrar alertas
import { useNavigate } from "react-router-dom"; // Para redirigir a otras páginas
import "../Styles/Ventas_MiCuenta.css"; // Estilos del menú

const VentasMiCuenta = () => {
  // 🔹 Estados para almacenar los datos del usuario y manejar la carga
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // 🔹 Extraemos el UUID del usuario desde el contexto
  const { user } = useContext(AuthContext);
  const navigate = useNavigate(); // Para navegar entre páginas

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // ✅ Si el usuario aún no ha sido cargado, esperamos
        if (!user || !user.sub) {
          setError(true);
          return;
        }

        // 🔹 Llamamos al endpoint con el UUID del usuario
        const response = await axios.post(
          "https://190qifrom0.execute-api.us-east-1.amazonaws.com/Development/user-Info-vendedor",
          { uuid: user.sub }
        );

        // 🔹 Guardamos los datos en el estado
        setUserData(response.data);
        setError(false); // ✅ No hay error
      } catch (error) {
        console.error("Error al obtener datos del usuario:", error);
        setError(true); // ✅ Activamos el estado de error
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [user]);

  // 🔹 Si está cargando, mostramos un spinner de Bootstrap
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

  // 🔹 Si hubo un error, evitamos mostrar la alerta si aún no hay usuario
  if (error && !user) {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "No se pudo cargar la información del usuario.",
    });
  }

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center PrincipalMiCuenta">
  <div className="custom-container">
    <div className="card shadow-lg">
      <div className="card-header text-center bg-primary text-white">
        <h3>Mi Cuenta</h3>
      </div>
      <div className="card-body">
        {userData ? (
          <div className="row">
            {/* 🟢 Primera columna con información */}
            <div className="col-md-6">
              <p><strong>Nombre:</strong> {userData.name || "No disponible"}</p>
              <p><strong>Email:</strong> {userData.email || "No disponible"}</p>
              <p><strong>Teléfono:</strong> {userData.phone_number || "No disponible"}</p>
              <p><strong>Estado:</strong> {userData.status || "No disponible"}</p>
            </div>

            {/* 🔹 Segunda columna con más información */}
            <div className="col-md-6">
              <p><strong>Fecha de Creación:</strong> {userData.fecha_creacion || "No disponible"}</p>
              <p><strong>Fecha de Modificación:</strong> {userData.fecha_modificacion || "No disponible"}</p>
              <p><strong>Rol:</strong> {userData.rol || "No disponible"}</p>

              {/* 🔹 Si es vendedor, mostramos equivalencia en puntos */}
              {userData.rol === "Vendedor" && (
                <p><strong>Equivalencia Puntos:</strong> {userData.equivalencia_puntos || "No disponible"}</p>
              )}

              {/* 🔹 Si es cliente, mostramos los puntos acumulados */}
              {userData.rol === "Cliente" && (
                <p><strong>Puntos Acumulados:</strong> {JSON.stringify(userData.puntos_acumulados) || "No disponible"}</p>
              )}
            </div>
          </div>
        ) : (
          <div className="container text-center mt-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Cargando...</span>
            </div>
            <p className="mt-3">Cargando información...</p>
          </div>
        )}
      </div>

      {/* 🔹 Botones de acción */}
      <div className="card-footer text-center">
        <button className="btn btn-warning me-2" onClick={() => navigate("/ventas/mi-cuenta/editar")}>
          Editar Cuenta
        </button>
        <button className="btn btn-danger" onClick={() => navigate("/ventas/mi-cuenta/cambiar-credenciales")}>
          Cambiar Credenciales
        </button>
      </div>
    </div>
  </div>
</div>
  );
};

export default VentasMiCuenta;
