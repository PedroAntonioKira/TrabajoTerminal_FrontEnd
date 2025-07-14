import { createContext, useState, useEffect } from "react";
import axios from "axios";

// 🔹 Creamos el contexto de autenticación
export const AuthContext = createContext();

/**
 * ✅ Función para verificar si el token ha expirado
 */
const isTokenExpired = (token) => {
  if (!token) return true; // Si no hay token, asumimos que está expirado.

  try {
    const payload = JSON.parse(atob(token.split(".")[1])); // Decodificamos el token
    const expTime = payload.exp * 1000; // Convertimos la expiración de segundos a milisegundos
    return Date.now() > expTime; // Retornamos `true` si el token ya expiró
  } catch (error) {
    return true; // Si hay un error al decodificar, asumimos que está expirado.
  }
};

/**
 * ✅ `AuthProvider` → Proveedor de autenticación global
 */
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); 
  const [isLoading, setIsLoading] = useState(true);

  // 🔹 URL del endpoint de la Lambda en API Gateway
  const API_URL = "https://190qifrom0.execute-api.us-east-1.amazonaws.com/Development/cognito-user-fetch";

  /**
   * ✅ `fetchUserData()` → Obtiene la información más reciente del usuario desde Cognito.
   * - Fusiona los datos nuevos con los datos existentes en `localStorage`.
   */
  const fetchUserData = async () => {
    try {
      // ✅ Validamos si hay datos de usuario en `localStorage`
      const storedUser = localStorage.getItem("user");
      if (!storedUser) {
        console.warn("No hay datos de usuario en localStorage, omitiendo actualización desde Cognito.");
        setIsLoading(false);
        return;
      }

      // ✅ Convertimos `storedUser` en un objeto
      const parsedUser = JSON.parse(storedUser);

      // ✅ Si no hay UUID en el usuario, no hacemos la petición
      if (!parsedUser.sub) {
        console.warn("El usuario no tiene un UUID válido, omitiendo consulta a Cognito.");
        setIsLoading(false);
        return;
      }

      // 🔥 Hacemos la petición a Cognito
      const response = await axios.post(API_URL, { uuid: parsedUser.sub });

      // ✅ Fusionamos los datos nuevos con los que ya estaban en `localStorage`
      const updatedUser = { ...parsedUser, ...response.data };

      // ✅ Si la respuesta es exitosa, actualizamos el estado y `localStorage`
      console.log("Datos actualizados desde Cognito:", updatedUser);
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));

    } catch (error) {
      console.error("Error al obtener los datos del usuario desde Cognito:", error);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * ✅ Al cargar la app, verificamos si hay sesión activa y actualizamos desde Cognito.
   */
  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);

        if (isTokenExpired(parsedUser.accessToken)) {
          logout(); 
        } else {
          setUser(parsedUser);
          fetchUserData(); // 🔥 Llamamos a Cognito para actualizar los datos
        }
      } catch (error) {
        console.error("Error al parsear user en localStorage:", error);
        localStorage.removeItem("user");
      }
    }
    setIsLoading(false); 
  }, []);

  /**
   * ✅ `isAuthenticated()` → Verifica si el usuario tiene sesión activa.
   */
  const isAuthenticated = () => {
    if (!user) return false;
    return !isTokenExpired(user.accessToken);
  };

  /**
   * ✅ `login(userData)` → Función para iniciar sesión.
   */
  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  /**
   * ✅ `logout()` → Función para cerrar sesión.
   */
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  // 🔹 Exportamos el contexto con los valores disponibles globalmente en toda la app
  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout, isLoading, fetchUserData }}>
      {children}
    </AuthContext.Provider>
  );
};
