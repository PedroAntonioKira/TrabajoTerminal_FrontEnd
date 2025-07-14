// src/components/auth/ConfirmPassword.jsx

import React, { useState, useEffect } from "react";
import { confirmNewPassword  } from "../api/forgotPasswordApi"; // 🔗 API
import Swal from "sweetalert2";
import { FaKey, FaEnvelope, FaLock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "../access/stylesAccess/ConfirmPassword.css"

const ConfirmPassword = () => {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  // ✅ Al iniciar, tratamos de recuperar el email guardado en localStorage
  useEffect(() => {
    const savedEmail = localStorage.getItem("resetEmail");
    if (savedEmail) setEmail(savedEmail);
  }, []);

  // 📌 Validaciones
  const isValidEmail = (email) =>
    /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/.test(email);

  const isValidCode = (code) => /^[0-9]{4,8}$/.test(code);

  const isValidPassword = (password) =>
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\$%&/().#*+\-]).{8}$/.test(password);

  // 🔐 Ver/Ocultar contraseña
  const toggleShowPassword = () => setShowPassword(!showPassword);

  // 📤 Enviar formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validaciones
    if (!isValidEmail(email)) {
      Swal.fire("Error", "Correo inválido", "error");
      return;
    }

    if (!isValidCode(code)) {
      Swal.fire("Error", "El código debe tener entre 4 y 8 dígitos", "error");
      return;
    }

    if (!isValidPassword(newPassword)) {
      Swal.fire(
        "Error",
        "La contraseña debe tener exactamente 8 caracteres e incluir mayúsculas, minúsculas, números y símbolos especiales",
        "error"
      );
      return;
    }

    if (newPassword !== confirmPassword) {
      Swal.fire("Error", "Las contraseñas no coinciden", "error");
      return;
    }

    try {
      const response = await confirmNewPassword({
        email,
        code,
        newPassword
      });

      Swal.fire("Éxito", response.message, "success").then(() => {
        localStorage.removeItem("resetEmail");
        navigate("../../");
      });
    } catch (error) {
      Swal.fire("Error", error.message || "Hubo un problema: "+error, "error");
    }
  };

  return (
    <div className="contenedorConfirmPassword">
        <div className="contenedorRegistro ConfirmPassword">
            <h3 className="text-center mb-4">Confirmar nueva contraseña</h3>
            <form onSubmit={handleSubmit} className="w-100">
            {/* Email */}
            <div className="form-group mb-3">
                <label className="form-label">
                <FaEnvelope className="me-2" />
                Correo electrónico
                </label>
                <input
                type="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Ingresa tu correo"
                required
                />
            </div>

            {/* Código */}
            <div className="form-group mb-3">
                <label className="form-label">
                <FaKey className="me-2" />
                Código de verificación
                </label>
                <input
                type="text"
                className="form-control"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="Ej: 123456"
                required
                />
            </div>

            {/* Nueva contraseña */}
            <div className="form-group mb-3">
                <label className="form-label">
                <FaLock className="me-2" />
                Nueva contraseña
                </label>
                <input
                type={showPassword ? "text" : "password"}
                className="form-control"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Nueva contraseña"
                required
                />
            </div>

            {/* Confirmar contraseña */}
            <div className="form-group mb-3">
                <label className="form-label">
                <FaLock className="me-2" />
                Confirmar contraseña
                </label>
                <input
                type={showPassword ? "text" : "password"}
                className="form-control"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Repite la contraseña"
                required
                />
            </div>

            {/* Mostrar contraseña */}
            <div className="form-check mb-3">
                <input
                className="form-check-input"
                type="checkbox"
                id="showPasswordCheck"
                checked={showPassword}
                onChange={toggleShowPassword}
                />
                <label className="form-check-label" htmlFor="showPasswordCheck">
                Mostrar contraseña
                </label>
            </div>

            <button type="submit" className="btn btn-success w-100">
                Confirmar cambio
            </button>

            <button
                type="button"
                className="btn btn-secondary w-100 mt-2"
                onClick={() => navigate("../../")}
                >
                Cancelar
                </button>
            </form>
        </div>
    </div>
  );
};

export default ConfirmPassword;