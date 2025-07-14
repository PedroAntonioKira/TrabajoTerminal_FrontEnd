// src/api/authRegister.js
import axios from "axios";

const API_REGISTER = "https://190qifrom0.execute-api.us-east-1.amazonaws.com/Development/register"; // reemplaza por la URL real

export const registerUser = async (formData) => {
  try {
    const response = await axios.post(API_REGISTER, formData);
    return response.data;
  } catch (error) {
    throw error;
  }
};
