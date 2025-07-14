// src/api/forgotPasswordApi.js

// 🔹 Importamos Axios para realizar peticiones HTTP
import axios from "axios";

// 🔐 Endpoint: Enviar código de recuperación
const FORGOT_PASSWORD_ENDPOINT =
  "https://190qifrom0.execute-api.us-east-1.amazonaws.com/Development/PasswordReset/SendPasswordResetCode";

// 🔐 Endpoint: Confirmar código y cambiar contraseña
const CONFIRM_PASSWORD_ENDPOINT =
  "https://190qifrom0.execute-api.us-east-1.amazonaws.com/Development/PasswordReset/ConfirmForgotPassword";

/**
 * 🔸 Envía un código de recuperación al correo electrónico del usuario.
 *
 * @param {string} email - Correo del usuario
 * @returns {Promise<Object>} - Respuesta del backend si es exitosa
 * @throws {string} - Mensaje de error si falla
 */
export const sendRecoveryCode = async (email) => {
  try {
    const payload = {
      email: email.toLowerCase().trim(), // 🔍 Normaliza el correo
    };

    const response = await axios.post(FORGOT_PASSWORD_ENDPOINT, payload);

    return response.data; // ✅ Mensaje del backend (éxito)
  } catch (error) {
    // ⚠️ Captura errores personalizados o genéricos
    throw (
      error.response?.data?.error || "No se pudo enviar el código de recuperación."
    );
  }
};

/**
 * 🔸 Confirma el código recibido y restablece la contraseña.
 *
 * @param {Object} data - { email, code, newPassword }
 * @returns {Promise<Object>} - Respuesta del backend si es exitosa
 * @throws {string} - Mensaje de error si falla
 */
export const confirmNewPassword = async (data) => {
  try {
    //alert("Holass"+ data.email + " " + data.code + " " + data.newPassword)
    const payload = {
      email: data.email.toLowerCase().trim(),
      code: data.code.trim(),
      new_password: data.newPassword,
    };

    const response = await axios.post(CONFIRM_PASSWORD_ENDPOINT, payload);

    return response.data;
  } catch (error) {
    throw (
      error.response?.data?.error || "No se pudo restablecer la contraseña."
    );
  }
};
