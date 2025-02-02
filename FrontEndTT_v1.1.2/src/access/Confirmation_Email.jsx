import { useState, useEffect } from "react";
import axios from "axios";
import ValidationsAsyn_ConfirmationEmail from "./ValidationAsyn/ValidationsAsyn_ConfirmationEmail";
import Instruction from "./Sign_Up_Components/Instruction";
import showValidationError02 from "./Confirmation_Email_ExecutionRequest/ConfirmationRequest"; // Importamos la función corregida

const Confirmation_Email = ({ onSwitch, prevPage, DataUser }) => {
  const [customToken01, setCustomToken01] = useState("");
  const [customEmailToConfirmation, setCustomEmailToConfirmation] = useState(DataUser);
  const [customValidateForm, setCustomValidateForm] = useState(false); // Estado para validaciones

  // Función para manejar el cambio en el input del token
  const handleTokenChange = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value) && value.length <= 6) {
      setCustomToken01(value);
    }
  };

  // 🔹 Función para consumir el endpoint con axios
  const handleValidateToken = async () => {
    console.log("🔹 TOKEN:", customToken01);
    console.log("🔹 EMAIL:", customEmailToConfirmation);

    // Validación básica antes de enviar la petición
    if (!customValidateForm) {
      showValidationError02(false, "El formulario no es válido, revisa los datos.");
      return;
    }

    if (!customToken01 || !customEmailToConfirmation) {
      showValidationError02(false, "Todos los campos son obligatorios.");
      return;
    }

    try {
      const response = await axios.post(
        "https://190qifrom0.execute-api.us-east-1.amazonaws.com/Development/confirm-user",
        {
          username: customEmailToConfirmation,
          confirmationCode: customToken01,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("✅ Respuesta del endpoint:", response.data);
      showValidationError02(true, "Tu cuenta ha sido confirmada exitosamente.");
    } catch (error) {
      console.error("❌ Error al validar el token:", error.response?.data);
      showValidationError02(false, error.response?.data || "Error desconocido al validar el token.");
    }
  };

  // Monitorear cambios en los estados
  useEffect(() => {
    console.log("📌 Token:", customToken01);
  }, [customToken01]);

  useEffect(() => {
    console.log("📌 Correo:", customEmailToConfirmation);
  }, [customEmailToConfirmation]);

  return (
    <div className="formulario fade-in">
      <h2>Confirmación de Usuario - {prevPage} - {DataUser}</h2>
      {prevPage === "Sign_Up_Ok" ? (
        <form>
          <div className="form-floating mb-3">
            <input
              type="email"
              className="form-control"
              placeholder="Ingresa tu Email"
              value={DataUser}
              disabled
              onChange={() => setCustomEmailToConfirmation(DataUser)}
            />
            <label>El correo que se registró fue:</label>
          </div>

          <ValidationsAsyn_ConfirmationEmail 
            email={customEmailToConfirmation} 
            validation={setCustomValidateForm} 
            token={customToken01} 
            typeForm={"email01"} 
          />
          <Instruction typeMenssage={"emailConfirmationDirect"} />

          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Ingresa tu Token de confirmación"
              value={customToken01}
              onChange={handleTokenChange}
            />
            <label>Token:</label>
          </div>

          <Instruction typeMenssage={"TokenConfirmation"} />

          <h1>Validación: {customValidateForm ? "✅ Correcta" : "❌ Incorrecta"}</h1>

          <div>
            <h1>TOKEN: {customToken01}</h1>
            <h1>EMAIL: {customEmailToConfirmation}</h1>
            <button type="button" className="button-prueba" onClick={handleValidateToken}>
              Validar Token
            </button>
            <button type="button" onClick={() => onSwitch(1, "Confirmation_Email")} className="button-prueba">
              Registrarse
            </button>
          </div>
        </form>
      ) : (
        <form>
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Ingresa tu Email"
              value={customEmailToConfirmation}
              onChange={(e) => setCustomEmailToConfirmation(e.target.value)}
            />
            <label>Correo:</label>
          </div>

          <ValidationsAsyn_ConfirmationEmail 
            email={customEmailToConfirmation} 
            validation={setCustomValidateForm} 
            token={customToken01} 
            typeForm={"email01"} 
          />
          <Instruction typeMenssage={"emailConfirmationNoDirect"} />

          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Ingresa tu Token de confirmación"
              value={customToken01}
              onChange={handleTokenChange}
            />
            <label>Token:</label>
          </div>

          <Instruction typeMenssage={"TokenConfirmation"} />

          <h1>El formulario esta llenado: {customValidateForm ? "✅ Correcta" : "❌ Incorrecta"}</h1>

          <h1>TOKEN: {customToken01}</h1>
          <h1>EMAIL: {customEmailToConfirmation}</h1>
          <button type="button" className="button-prueba" onClick={handleValidateToken}>
            Validar Token
          </button>
          <button type="button" onClick={() => onSwitch(1, "Confirmation_Email")} className="button-prueba">
            Registrarse
          </button>
        </form>
      )}
    </div>
  );
};

export default Confirmation_Email;

