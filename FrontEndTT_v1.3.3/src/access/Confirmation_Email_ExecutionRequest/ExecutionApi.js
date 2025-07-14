import axios from "axios";
import showValidationError02 from "../Confirmation_Email_ExecutionRequest/ConfirmationRequest"; // Asegúrate de la ruta correcta

const API_URL = "https://190qifrom0.execute-api.us-east-1.amazonaws.com/Development/confirm-user";

/**
 * Función para validar el token de confirmación de usuario.
 * @param {string} email - Correo del usuario a confirmar.
 * @param {string} token - Código de confirmación.
 * @param {boolean} isValidForm - Indica si el formulario ha pasado las validaciones.
 */
export const handleValidateToken = async (email, token, isValidForm) => {
  console.log("🔹 TOKEN:", token);
  console.log("🔹 EMAIL:", email);

  if (!isValidForm) {
    showValidationError02(false, "El formulario no es válido, revisa los datos.");
    return;
  }

  if (!token || !email) {
    showValidationError02(false, "Todos los campos son obligatorios.");
    return;
  }

  try {
    const response = await axios.post(
      API_URL,
      { username: email, confirmationCode: token },
      { headers: { "Content-Type": "application/json" } }
    );

    console.log("✅ Respuesta del endpoint:", response.data);
    showValidationError02(true, "Tu cuenta ha sido confirmada exitosamente.");
  } catch (error) {
    console.error("❌ Error al validar el token:", error.response?.data);
    showValidationError02(false, error.response?.data || "Error desconocido al validar el token.");
  }
};