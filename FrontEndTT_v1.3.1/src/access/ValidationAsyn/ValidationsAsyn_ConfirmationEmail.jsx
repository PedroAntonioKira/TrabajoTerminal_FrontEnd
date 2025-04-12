import React, { useEffect } from "react";

const ValidationsAsyn_ConfirmationEmail = ({email, validation, token, typeForm}) => {
  //Variable para validar email
  let email01_isValid = false; //se guardará si el formato del email01 es valido
  let token01_isValid = false; //se validará que el token tenga algo escrito 

  // Expresión regular para validar un email tenga el formato correcto
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  // Validación de formato de email01
  if (emailRegex.test(email) || email  == "") {
    email01_isValid = true;
    console.log("email is " + email01_isValid)
  } else {
    email01_isValid = false;
    console.log("Email is " + email01_isValid)
  }

  //Validamos tenga al menos tres caracteres o digitos el token
  if(token.length > 3){
    token01_isValid = true;
    console.log("token is " + token01_isValid)
  }else{
    token01_isValid = false;
    console.log("Token is " + token01_isValid)
  }

  useEffect(() => { 
  
      // Luego de hacer todas las validaciones, actualizamos el estado `validate` si es necesario
      if (
          email01_isValid &&
          token01_isValid
        ) {
            validation(true);
        } else {
            validation(false);
        }
  
    },  [email, token, typeForm]);  // Dependencias: ejecutamos el effect cuando cambian `data` o `form`

  return (
    
    <>
    {/* Validamos en caso que sea el componente del email01*/}
    {!email01_isValid && typeForm == "email01" && (
        <p className="errorRegistro">
          {" "}
          ¡Cuidado! El email <span> {email} </span> aún no es correcto,
          revisa por favor este bien escrito, debe tener esta forma te dejo un
          ejemplo para que te guies: example@email.com, si lo escribes
          correctamente y ya tiene un formato correcto, entonces, desaparecera
          este mensaje
        </p>
      )}

    
    </>
  )
}

export default ValidationsAsyn_ConfirmationEmail