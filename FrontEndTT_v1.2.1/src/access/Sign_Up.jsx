import { useState } from "react";
/* Validation */
import ValidationsAsyn from "./ValidationAsyn/ValidationsAsyn_SignUp";

/* Componentes del registro */
import Email from "./Sign_Up_Components/Email";
import Instruction from "./Sign_Up_Components/Instruction";
import Password from "./Sign_Up_Components/Password";
import Phone from "./Sign_Up_Components/Phone";
import Rol from "./Sign_Up_Components/Rol";
import Username from "./Sign_Up_Components/Username";

/* ejecucion de la solicitud */
import handleSubmitDatos from "./Sign_Up_ExecutionRequest/handleSubmitDatos";

const Sign_Up = ({ onSwitch }) => {
  //Declaramos Estados
  const [customEmail01, setCustomEmail01] = useState("");
  const [customEmail02, setCustomEmail02] = useState("");
  const [customPassword01, setCustomPassword01] = useState("");
  const [customPassword02, setCustomPassword02] = useState("");
  const [customTelefono01, setCustomTelefono01] = useState("");
  const [customTelefono02, setCustomTelefono02] = useState("");
  const [customUser01, setCustomUser01] = useState("");
  const [customUserType01, setCustomUserType01] = useState("Cliente");
  const [customValidateForm, setCustomValidateForm] = useState(false);

  //Objeto de datos que se mandara a el estado de axios
  //Datos Del Formulario
  const formDataPre = {
    username: "",
    password: "",
    email: "",
    role: "",
    status: "",
    creation_date: "",
    modification_date: "",
    phone_number: "",
    name: "",
  };

  //Datos Del Formulario
  const formData = {
    email01: customEmail01,
    email02: customEmail02,
    password01: customPassword01,
    password02: customPassword02,
    telefono01: customTelefono01,
    telefono02: customTelefono02,
    user01: customUser01,
    userType01: customUserType01,
    validate: setCustomValidateForm,
  };

  return (
    <div className="formulario fade-in">
      <h2>Registro de Usuario 05</h2>

      <Instruction typeMenssage={"description"} />

      <hr />

      <form
        onSubmit={(e) =>
          handleSubmitDatos(
            e,
            customEmail01,
            customEmail02,
            customPassword01,
            customPassword02,
            customTelefono01,
            customTelefono02,
            customUserType01,
            customUser01,
            formData,
            customValidateForm,
            setCustomValidateForm,
            onSwitch
          )
        }
      >
        <Email
          setCustomEmail={setCustomEmail01}
          textInput={"Ingresa tu correo eléctronico, por favor:"}
        />

        <ValidationsAsyn data={formData} form={"email01"} />

        <Email
          setCustomEmail={setCustomEmail02}
          textInput={
            "Confirma tu correo eléctronico, ingresandolo de nuevo, por favor:"
          }
        />

        <ValidationsAsyn data={formData} form={"email02"} />

        <Instruction typeMenssage={"email"} />

        <hr />

        <Password
          setCustomPassword={setCustomPassword01}
          textInput={
            "Ingresa una contraseña y por favor recuerdela para usar su cuenta, por favor:"
          }
        />

        <ValidationsAsyn data={formData} form={"password01"} />

        <Password
          setCustomPassword={setCustomPassword02}
          textInput={
            "Confirma tu contraseña, ingresandola de nuevo, por favor:"
          }
        />

        <ValidationsAsyn data={formData} form={"password02"} />

        <Instruction typeMenssage={"password"} />

        <hr />

        <Phone
          customTelefono={customTelefono01}
          setCustomTelefono={setCustomTelefono01}
          textInput={
            "Ingresa un telefono con el cual se vincule a esta cuenta, por favor:"
          }
        />

        <ValidationsAsyn data={formData} form={"phone01"} />

        <Phone
          customTelefono={customTelefono02}
          setCustomTelefono={setCustomTelefono02}
          textInput={"Ingrese de nuevo su teléfono para confirmar, por favor:"}
        />

        <ValidationsAsyn data={formData} form={"phone02"} />

        <Instruction typeMenssage={"phone"} />

        <hr />

        <Rol setCustomUserType={setCustomUserType01} />

        <Instruction typeMenssage={"rolUser"} />

        <hr />

        <Username setCustomUser={setCustomUser01} />

        <ValidationsAsyn data={formData} form={"user01"} />

        <Instruction typeMenssage={"username"} />

        <hr />

        <button
          type="button"
          onClick={(e) => {
            onSwitch(3,"Sign_up", "");
          }}
          className="button-prueba"
        >
          Validar Token
        </button>
        <button type="submit" className="btn btn-primary">
          Registar usuario
        </button>
      </form>
    </div>
  );
};

export default Sign_Up;
