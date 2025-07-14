import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

/* Validation */
import ValidationsAsyn from "./ValidationAsyn/ValidationsAsyn_SignUp";
import Validations from "./Sign_Up_ExecutionRequest/Validations";

/* Componentes del registro */
import Email from "./Sign_Up_Components/Email";
import Instruction from "./Sign_Up_Components/Instruction";
import Password from "./Sign_Up_Components/Password";
import Phone from "./Sign_Up_Components/Phone";
import Rol from "./Sign_Up_Components/Rol";
import Username from "./Sign_Up_Components/Username";

/* API */
import { registerUser } from "../api/authRegister";

/* Estilos */
import "../access/stylesAccess/Sign_Up.css"

const Sign_Up = () => {
  const navigate = useNavigate();

  const [customEmail01, setCustomEmail01] = useState("");
  const [customEmail02, setCustomEmail02] = useState("");
  const [customPassword01, setCustomPassword01] = useState("");
  const [customPassword02, setCustomPassword02] = useState("");
  const [customTelefono01, setCustomTelefono01] = useState("");
  const [customTelefono02, setCustomTelefono02] = useState("");
  const [customUser01, setCustomUser01] = useState("");
  const [customUserType01, setCustomUserType01] = useState("Cliente");
  const [customValidateForm, setCustomValidateForm] = useState(false);

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isIncorrect = Validations(
      customEmail01,
      customEmail02,
      customPassword01,
      customPassword02,
      customTelefono01,
      customTelefono02,
      customUserType01,
      customUser01,
      formData,
      setCustomValidateForm
    );

    if (customValidateForm && isIncorrect === 0) {
      const fechaActual = new Date();
      const año = fechaActual.getFullYear();
      let mes = fechaActual.getMonth() + 1;
      let dia = fechaActual.getDate();
      if (mes < 10) mes = `0${mes}`;
      if (dia < 10) dia = `0${dia}`;
      const fechaFormateada = `${año}-${mes}-${dia}`;

      const formDataPre = {
        username: customEmail01,
        password: customPassword01,
        email: customEmail01,
        role: customUserType01,
        status: "active",
        creation_date: fechaFormateada,
        modification_date: fechaFormateada,
        phone_number: `+52${customTelefono01}`,
        name: customUser01,
      };

      try {
        const response = await registerUser(formDataPre);

        Swal.fire({
          icon: "success",
          title: "¡Registro exitoso!",
          text: "Valida tu correo electrónico para continuar.",
          timer: 2000,
          showConfirmButton: false,
        });

        setTimeout(() => {
          navigate("/verificar-correo", { state: { userData: formDataPre } });
        }, 2000);
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Error al registrar",
          text: "Verifica tu conexión o intenta más tarde.",
        });
      }
    } else {
      console.log("Formulario inválido. No se enviaron datos.");
    }
  };

  return (
    <div className="contenedorRegistro">
      <div className="formulario fade-in">
        <h2>Registro de Usuario</h2>

        <Instruction typeMenssage={"description"} />
        <hr />

        <form onSubmit={handleSubmit}>
          <Email setCustomEmail={setCustomEmail01} textInput="Correo electrónico:" />
          <ValidationsAsyn data={formData} form={"email01"} />

          <Email setCustomEmail={setCustomEmail02} textInput="Confirma tu correo:" />
          <ValidationsAsyn data={formData} form={"email02"} />
          <Instruction typeMenssage={"email"} />
          <hr />

          <Password setCustomPassword={setCustomPassword01} textInput="Contraseña:" />
          <ValidationsAsyn data={formData} form={"password01"} />

          <Password setCustomPassword={setCustomPassword02} textInput="Confirma tu contraseña:" />
          <ValidationsAsyn data={formData} form={"password02"} />
          <Instruction typeMenssage={"password"} />
          <hr />

          <Phone setCustomTelefono={setCustomTelefono01} textInput="Teléfono:" />
          <ValidationsAsyn data={formData} form={"phone01"} />

          <Phone setCustomTelefono={setCustomTelefono02} textInput="Confirma tu teléfono:" />
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

          <div className="botones_register">
            <button type="submit" className="btn btn-success">Registrar usuario</button>
            <button type="button" className="btn btn-secondary" onClick={() => navigate("../")}>Regresar</button>
            <button type="button" className="btn btn-info" onClick={() => navigate("/verificar-correo")}>Validar token</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Sign_Up;
