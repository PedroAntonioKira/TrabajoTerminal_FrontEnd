import { createContext, useState, useEffect } from "react";

// Crear el contexto
export const AuthContext = createContext();

// Función para verificar si el token ha expirado
const isTokenExpired = (token) => {
  if (!token) return true; // Si no hay token, consideramos que está expirado

  try {
    const payload = JSON.parse(atob(token.split(".")[1])); // Decodificar token
    const expTime = payload.exp * 1000; // Convertir segundos a milisegundos
    return Date.now() > expTime; // Si la fecha actual es mayor, el token ya expiró
  } catch (error) {
    return true; // Si falla la decodificación, consideramos que está expirado
  }
};

// Proveedor de autenticación
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Verificar si hay un usuario en localStorage al cargar la app
  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);

      // Si el token ya expiró, cerrar sesión automáticamente
      if (isTokenExpired(parsedUser.accessToken)) {
        logout();
      } else {
        setUser(parsedUser);
      }
    }
  }, []);

  // Función para iniciar sesión
  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  // Función para cerrar sesión
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
