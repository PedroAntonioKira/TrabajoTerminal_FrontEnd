// apiProductos.js

import axios from "axios";

/**
 * Consulta los productos de un vendedor desde la API.
 * @param {string} token - Token de acceso del usuario (Cognito)
 * @param {string} uuid - UUID del usuario
 * @param {string|null} lastKey - Última clave para paginación
 * @returns {Promise<Object>} Respuesta del API
 */
export const obtenerProductosPorVendedor = async (token, uuid, lastKey = null) => {
  const body = { uuid };
  if (lastKey) {
    body.lastKey = lastKey;
  }

  const response = await axios.post(
    "https://190qifrom0.execute-api.us-east-1.amazonaws.com/Development/product-info-vendedor",
    body,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );

  return response.data;
};
