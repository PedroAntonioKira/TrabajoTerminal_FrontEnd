// src/api/confirmUser.js
import axios from "axios";

const API_URL = "https://190qifrom0.execute-api.us-east-1.amazonaws.com/Development/confirm-user";

/**
 * Valida el token de un usuario.
 * @param {string} email
 * @param {string} token
 */
export const confirmUser = async (email, token) => {
  const response = await axios.post(
    API_URL,
    {
      username: email,
      confirmationCode: token,
    },
    {
      headers: { "Content-Type": "application/json" },
    }
  );

  return response.data;
};
