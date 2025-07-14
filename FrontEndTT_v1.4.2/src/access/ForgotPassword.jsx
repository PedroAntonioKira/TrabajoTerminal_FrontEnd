// src/components/auth/ForgotPassword.jsx

import React, { useState } from "react";
import { sendRecoveryCode } from "../api/forgotPasswordApi"; // 🔗 Llamada a la API
import Swal from "sweetalert2"; // 🎉 Librería para alertas elegantes
import { FaEnvelope } from "react-icons/fa"; // 📧 Icono de email
import { useNavigate } from "react-router-dom";
import "../access/stylesAccess/ForgotPassword.css"

function ForgotPassword() {
  // 🧠 Hook para redirigir a otras rutas
  const navigate = useNavigate();

  // 📩 Estado para guardar el correo del usuario
  const [email, setEmail] = useState("");

  /**
   * 🔍 Función para validar si el correo tiene un formato válido
   */
  const isValidEmail = (correo) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(correo);
  };

  /**
   * 📤 Envía el código al correo ingresado
   */
  const handleSendCode = async (e) => {
    e.preventDefault();

    // 🛡️ Validación del correo
    if (!isValidEmail(email)) {
      Swal.fire({
        icon: "warning",
        title: "Correo inválido",
        text: "Por favor ingresa un correo electrónico válido.",
      });
      return;
    }

    try {
      // 🚀 Llama a la API para enviar el código
      await sendRecoveryCode(email);

      Swal.fire({
        icon: "success",
        title: "Código enviado",
        text: "Revisa tu correo para continuar con el cambio de contraseña.",
      });

      // 🎯 Redirige al siguiente paso con el correo ya guardado
      navigate("/olvide-password/confirmar-password-olvidada", { state: { email } });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.toString(),
      });
    }
  };

  return (
    <div className="contenedorForgotPassword">
        <div className="contenedorRegistro ForgotPassword">
            <h3 className="text-center mb-4">Recuperar contraseña</h3>

            <form onSubmit={handleSendCode}>
                <div className="form-group mb-3">
                <label htmlFor="email">Correo electrónico:</label>
                <div className="input-group">
                    <span className="input-group-text">
                    <FaEnvelope />
                    </span>
                    <input
                    type="email"
                    className="form-control"
                    placeholder="ejemplo@correo.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    />
                </div>
                </div>

                <button type="submit" className="btn btn-primary w-100 mb-2">
                Enviar código
                </button>

                {/* 🔁 Alternativa si el usuario ya tiene el código */}
                <button
                type="button"
                className="btn btn-outline-secondary w-100"
                onClick={() => navigate("/olvide-password/confirmar-password-olvidada")}
                >
                Ya tengo el código
                </button>
            </form>
        </div>
    </div>
  );
}

export default ForgotPassword;
