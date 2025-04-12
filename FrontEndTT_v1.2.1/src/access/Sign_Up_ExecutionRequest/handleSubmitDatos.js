//importamos funciones personalizadas para validar
import Validations from "./Validations";
/* Liberia para ejecutar petición HTTPS */
import axios from "axios";
/* confirmación de la consulta de ingreso */
import ConfirmationRequest from "./ConfirmationRequest";

//Respuesta del servidor
let is_Incorrect = 0;

const handleSubmitDatos = async (
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
) => {
  e.preventDefault();
  is_Incorrect = Validations(
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

  if (customValidateForm && is_Incorrect == 0) {
    console.log("Validaciones correctas, preparando datos...");
    console.log("DATOOOOS =  " + is_Incorrect);

    let status = "active";

    const fechaActual = new Date();
    const año = fechaActual.getFullYear();
    let mes = fechaActual.getMonth() + 1;
    let dia = fechaActual.getDate();

    if (mes < 10) mes = `0${mes}`;
    if (dia < 10) dia = `0${dia}`;

    let creation_date = `${año}-${mes}-${dia}`;
    let modification_date = `${año}-${mes}-${dia}`;

    const formDataPre = {
      username: customEmail01,
      password: customPassword01,
      email: customEmail01,
      role: customUserType01,
      status,
      creation_date,
      modification_date,
      phone_number: `+52${customTelefono01}`,
      name: customUser01,
    };

    console.log("Datos que se enviarán al endpoint:", formDataPre);

    try {
      const response = await axios.post(
        "https://190qifrom0.execute-api.us-east-1.amazonaws.com/Development/register",
        formDataPre,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Respuesta del servidor:", response.data);

      ConfirmationRequest(response.data, onSwitch, formDataPre.email);

      console.log(typeof response.data);
      console.log(response.data);
      console.log("Enviooooo: " + formDataPre.email);
      console.log("Mensaaaaje:");
      //mostrarMensaje(response.data)
      console.log("Finnn Mensaaaaje:");
    } catch (error) {
      if (error.response) {
        console.error("Respuesta del servidor con error:", error.response.data);
        console.log("Tipo de dato" + typeof error.response.data);
      } else if (error.request) {
        console.error("La solicitud no obtuvo respuesta:", error.request);
      } else {
        console.error("Error al configurar la solicitud:", error.message);
      }
    }
  } else {
    console.log("Validaciones fallidas, revisa los campos del formulario.");
  }
};

export default handleSubmitDatos;
