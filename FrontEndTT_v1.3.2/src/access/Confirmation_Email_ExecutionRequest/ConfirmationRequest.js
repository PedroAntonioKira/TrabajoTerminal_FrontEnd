import Swal from 'sweetalert2';

// Función para mostrar alertas según el resultado de la validación
const showValidationError02 = (resultado, mensaje) => {
  if (resultado) {
    Swal.fire({
      icon: "success",
      title: "✅ Confirmación Exitosa",
      text: mensaje,
    });
  } else {
    Swal.fire({
      icon: "error",
      title: "❌ Error en la Validación",
      text: "Error: " + mensaje,
    });
  }
};

// Exportamos la función directamente para su uso en otros archivos
export default showValidationError02;
