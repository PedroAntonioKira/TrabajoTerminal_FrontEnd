// src/api/auth.js
// 📦 Funciones de autenticación y comunicación con Lambdas

import axios from "axios";

// 🟢 Lambda para iniciar sesión y obtener tokens
export const loginUser = async (email, password) => {
  const endpoint = "https://190qifrom0.execute-api.us-east-1.amazonaws.com/Development/login";
  const payload = { email, password };
  const response = await axios.post(endpoint, payload);
  return response.data; // ✅ Retorna idToken, accessToken y refreshToken
};

// 🟢 Lambda para registrar/verificar al usuario en DynamoDB
export const obtenerInformacionUsuario = async (accessToken, idToken, tipoOperacion, userID) => {
  const API_SAVE_DATA =
  "https://190qifrom0.execute-api.us-east-1.amazonaws.com/Development/save-data";

  const payload = {
    UserID: userID,
    tipo_operacion: tipoOperacion, // Generalmente 1 para primer login
  };

  try {
    //alert("Va biens" + payload + " # " + payload.UserID + " # " + payload.tipo_operacion )
    const lambdaResponse = await axios.post(API_SAVE_DATA, {
          UserID: userID,
          TipoOperacion: tipoOperacion, // Tipo de operación: Registro inicial
        });

    console.log("✅ Respuesta de Lambda:", lambdaResponse);
    //alert("No Error: " + lambdaResponse)
    return lambdaResponse.data;
  } catch (error) {
    //alert("ERROR: " + error + lambdaResponse)
        console.error("❌ Error al llamar a la Lambda:", error);
        return null;
      }
  
};
