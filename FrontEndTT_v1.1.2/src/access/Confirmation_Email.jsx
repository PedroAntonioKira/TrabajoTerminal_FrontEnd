import { useState, useEffect } from "react";
import ValidationsAsyn_ConfirmationEmail from "./ValidationAsyn/ValidationsAsyn_ConfirmationEmail";
import Instruction from "./Sign_Up_Components/Instruction";
import EmailDirect from "./Confirmation_Email_Components/EmailDirect"
import EmailNoDirect from "./Confirmation_Email_Components/EmailNoDirect"
import Token from "./Confirmation_Email_Components/Token";
import handleTokenChange from "./Confirmation_Email_Utils/handleTokenChange"
import { handleValidateToken }  from "./Confirmation_Email_ExecutionRequest/ExecutionApi"

const Confirmation_Email = ({ onSwitch, prevPage, DataUser }) => {
  const [customToken01, setCustomToken01] = useState("");
  const [customEmailToConfirmation, setCustomEmailToConfirmation] = useState(DataUser);
  const [customValidateForm, setCustomValidateForm] = useState(false); // Estado para validaciones

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

          <EmailDirect setCustomEmailToConfirmation={setCustomEmailToConfirmation} textInput={"El correo que se registró fue:"} DataUser={DataUser}/>

          <ValidationsAsyn_ConfirmationEmail 
            email={customEmailToConfirmation} 
            validation={setCustomValidateForm} 
            token={customToken01} 
            typeForm={"email01"} 
          />
          <Instruction typeMenssage={"emailConfirmationDirect"} />

          <Token handleTokenChange={(e) => handleTokenChange(e, setCustomToken01)} customToken01={customToken01}/>

          <Instruction typeMenssage={"TokenConfirmation"} />

          <h1>Validación: {customValidateForm ? "✅ Correcta" : "❌ Incorrecta"}</h1>

          <div>
            <button type="button" className="button-prueba" 
              onClick={() => handleValidateToken(customEmailToConfirmation, customToken01, customValidateForm)}>
                Validar Token
            </button>
            <button type="button" onClick={() => onSwitch(1, "Confirmation_Email")} className="button-prueba">
            Iniciar Sesión
            </button>
          </div>
        </form>
      ) : (
        <form>

          <EmailNoDirect setCustomEmailToConfirmation={setCustomEmailToConfirmation} textInput={"Correo:"} customEmailToConfirmation={customEmailToConfirmation}/>

          <ValidationsAsyn_ConfirmationEmail 
            email={customEmailToConfirmation} 
            validation={setCustomValidateForm} 
            token={customToken01} 
            typeForm={"email01"} 
          />
          <Instruction typeMenssage={"emailConfirmationNoDirect"} />

          <Token handleTokenChange={(e) => handleTokenChange(e, setCustomToken01)} customToken01={customToken01}/>

          <Instruction typeMenssage={"TokenConfirmation"} />

          <h1>El formulario esta llenado: {customValidateForm ? "✅ Correcta" : "❌ Incorrecta"}</h1>

          <button type="button" className="button-prueba" 
            onClick={() => handleValidateToken(customEmailToConfirmation, customToken01, customValidateForm)}>
              Validar Token
          </button>
          <button type="button" onClick={() => onSwitch(1, "Confirmation_Email")} className="button-prueba">
            Iniciar Sesión
          </button>
        </form>
      )}
    </div>
  );
};

export default Confirmation_Email;
