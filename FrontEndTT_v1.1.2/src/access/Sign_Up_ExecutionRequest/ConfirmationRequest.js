import Swal from 'sweetalert2'

function ConfirmationRequest(respuesta, onSwitch, email) {
    if (typeof respuesta == 'string') {
        // Caso 3: Respuesta es un string, mensaje de éxito.
        console.log('Éxito: ' + respuesta);
        Swal.fire({
            icon: "success",
            title: "¡Felicidades!",
            text: `El registro del usuario se realizo de forma correcta`,

        });
        console.log("sasasasasasa: " + email)
        onSwitch(3, "Sign_Up_Ok",email)
    } else {
            console.log("Entro en el primer caso");
            Swal.fire({
                        icon: "error",
                        title: "Error tienes campos incorrectos",
                        text: `Error: ${respuesta.errorMessage}`,
            
                    });
        }
}

export default ConfirmationRequest;
