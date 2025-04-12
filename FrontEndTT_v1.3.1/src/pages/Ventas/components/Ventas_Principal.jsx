import React, { useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";

const Ventas_Principal = () => {
  const { user, isLoading } = useContext(AuthContext);

  // ✅ Si está cargando, mostramos un mensaje
  if (isLoading) {
    return <h2>Cargando datos...</h2>;
  }

  // ✅ Si user aún es null después de la carga, evitamos el error
  if (!user) {
    return <h2>Error: No se pudo recuperar la sesión.</h2>;
  }

  // ✅ Evitamos problemas con caracteres especiales
  const nombreUsuario = decodeURIComponent(escape(user.name || "Usuario"));

  console.log("Holaaa");
  console.log(user);

  return (
    <>
      <h1>Hola usuario bienvenido {nombreUsuario}</h1>
      <div>Ventas_Principal</div>
    </>
  );
};

export default Ventas_Principal;
