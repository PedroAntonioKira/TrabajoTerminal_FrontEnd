import Swal from 'sweetalert2'
function Validations(email01, email02, password01, password02, phone01, phone02, type, usuarioName, data, setCustomValidateForm){
    //Ejecutamos mensaje de validación al usuario
    let error=0;

    //Validamos si algo no esta bien en alguna validación
    if (!data.validate){
        Swal.fire({
            icon: "error",
            title: "Error tienes campos incorrectos",
            text: 'Revisa por favor todos tus datos para pdoer registrar correctamente el formulario',

        });
        error += 1;
    }
    
    //validaciones para el email01 no este vacio
    if(email01==''){
            Swal.fire({
                icon: "error",
                title: "Error en el Primer Email",
                text: 'El Primer Email no puede estar vacio',
    
            });
            console.log("jojoojoj")
            error += 1;
    }

    //validaciones para el email02 no este vacio
    if(email02==''){
        Swal.fire({
            icon: "error",
            title: "Error en el Segundo Email",
            text: 'El Segundo Email no puede estar vacio',

        });
        error += 1;
    }

    //validaciones para el password01 no este vacio
    if(password01==''){
        Swal.fire({
            icon: "error",
            title: "Error en el primer campo de la contraseña",
            text: 'El primer campo de la contraseña no puede estar vacio',

        });
        error += 1;
    }

    //validaciones para el password02 no este vacio
    if(password02==''){
        Swal.fire({
            icon: "error",
            title: "Error en el segundo campo de la contraseña",
            text: 'El segundo campo de la contraseña no puede estar vacio',

        });
        error += 1;
    }

    //validaciones para el phone01 no este vacio
    if(phone01==''){
        Swal.fire({
            icon: "error",
            title: "Error en el primer télefono",
            text: 'El primer télefono no puede estar vacio',

        });
        error += 1;
    }

    //validaciones para el phone02 no este vacio
    if(phone02==''){
        Swal.fire({
            icon: "error",
            title: "Error en el segundo télefono",
            text: 'El segundo télefono no puede estar vacio',

        });
        error += 1;
    }

    //validaciones para el type no sea de un tipo incorrecto
    if(type!='Cliente' && type!='Vendedor'){
        Swal.fire({
            icon: "error",
            title: "Error en el tipo de cliente",
            text: 'El tipo no puede haber un tipo diferente a Cliente o Vendedor',

        });
        error += 1;
    }

    //validaciones para el usuarioName no este vacio
    if(usuarioName==''){
        Swal.fire({
            icon: "error",
            title: "Error en el nombre de usuario",
            text: 'El nombre de usuario no puede estar vacio',

        });
        error += 1;
    }

    return error;

}
export default Validations;
//Ej$Mplo1