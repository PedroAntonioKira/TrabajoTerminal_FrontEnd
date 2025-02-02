import Swal from 'sweetalert2';

const ValidationConfirmEmail = () => {
  const showValidationError = () => {
    Swal.fire({
      icon: "error",
      title: "Error tienes campos incorrectos",
      text: 'Revisa por favor todos tus datos para poder registrar correctamente el formulario',
    });
  };

  return {
    showValidationError,
  };
};

export default ValidationConfirmEmail;