import React, { useEffect } from "react";

const ValidationsAsyn = ({ data, form }) => {
  //console.log("Hola");
  //console.log(data.email01);
  //console.log(data.email02);
  //console.log(data.password01);
  //console.log(data.password02);
  //console.log(data.telefono01);
  //console.log(data.telefono02);
  //console.log(data.user01);
  //console.log(data.userType01);
  //console.log(data.validate);
  //console.log("miren: " + form);

  //Variable para validar email
  let email01_isValid = false; //se guardará si el formato del email01 es valido
  let email02_isValid = false; //se guardará si el formato del email02 es valido
  let email02_isTheSameTo_email01 = false; // se guardará si el email02 es igual al email01
  //Variable para validar password
  let password01_isValid = false; //se guardará si el formato del password01 es valido
  let password02_isValid = false; //se guardará si el formato del password02 es valido
  let password02_isTheSameTo_password01 = false; // se guardará si el password02 es igual al password01
  //Variable para validar telefono
  let phone01_isValid = false; //se guardará si el formato del phone01 es valido
  let phone02_isValid = false; //se guardará si el formato del phone02 es valido
  let phone02_isTheSameTo_phone01 = false; // se guardará si el phone02 es igual al phone01
  //Variable para alidar el usuario
  let user_isValid = false;
  //Bandera para validar formulario

  //Variable que retorna html
  let retorno = <h1>Pedro</h1>;

  // Expresión regular para validar un email tenga el formato correcto
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  // Expresión regular para validar que la contraseña tenga 8 caracteres, una mayúscula, una minúscula, un número y un simbolo especial al menos.
  const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[$#&%¡¿?!_*])[A-Za-z\d$#&%¡¿?!_*]{8}$/;


  // Validación de formato de email01
  if (emailRegex.test(data.email01) || data.email01 == "") {
    //console.log("El email01 es válido. + " + data.validate);
    email01_isValid = true;
    //data.validate(true);
    //data.handleValidateForm(true);
    //data.validate = true;
  } else {
    //console.log("El email01 no es válido.");
    email01_isValid = false;
    //data.validate(false);
    //data.handleValidateForm(false);
    //data.validate = false;
  }

  // Validación de formato de email02
  if (emailRegex.test(data.email02) || data.email02 == "") {
    //console.log("El email02 es válido.");
    email02_isValid = true;
    //data.validate(true);
  } else {
    //console.log("El email02 no es válido.");
    email02_isValid = false;
    //data.validate(false);
  }

  // Validacion de igualdad email01 y email02
  if (
    data.email01 != data.email02 &&
    email02_isValid &&
    email01_isValid &&
    data.email02 != "" &&
    data.email01 != ""
  ) {
    email02_isTheSameTo_email01 = true;
    //data.validate(true);
    /*
    console.log(
      "ValidacionIGual IF email01" +
        email01_isValid +
        " ,email02: " +
        email02_isValid +
        " ,es valido? " +
        email02_isTheSameTo_email01
    );*/
  } else {
    email02_isTheSameTo_email01 = false;
    //data.validate(false);
    /*
    console.log(
      "ValidacionIGual ELSE email01 " +
        email01_isValid +
        " ,email02: " +
        email02_isValid +
        " ,es valido? " +
        email02_isTheSameTo_email01
    );*/
  }

  //Validación de formato de contraseña01
  if (passwordRegex.test(data.password01) || data.password01 == "") {
    password01_isValid = true;
    //data.validate(true);
    //console.log("La contraseña01 es válida.");
} else {
    password01_isValid = false;
    //data.validate(false);
    //console.log("La contraseña01 no es válida.");
}

//Validación de formato de contraseña02
if (passwordRegex.test(data.password02) || data.password02 == "") {
    password02_isValid = true;
    //data.validate(true);
    //console.log("La contraseña02 es válida.");
} else {
    password02_isValid = false;
    //data.validate(false);
    //console.log("La contraseña02 no es válida.");
}

// Validacion de igualdad contraseña01 y contraseña02
if (
    data.password01 != data.password02 &&
    password02_isValid &&
    password01_isValid &&
    data.password02 != "" &&
    data.password01 != ""
  ) {
    password02_isTheSameTo_password01 = true;
    //data.validate(true);
    /*
    console.log(
      "ValidacionIGual IF email01" +
        email01_isValid +
        " ,email02: " +
        email02_isValid +
        " ,es valido? " +
        email02_isTheSameTo_email01
    );*/
  } else {
    password02_isTheSameTo_password01 = false;
    //data.validate(false);
    /*
    console.log(
      "ValidacionIGual ELSE email01 " +
        email01_isValid +
        " ,email02: " +
        email02_isValid +
        " ,es valido? " +
        email02_isTheSameTo_email01
    );*/
  }

  //Validamos el número télefonico01 unicamente tenga
  if(data.telefono01.length == 10 || data.telefono01 == ""){
    //console.log("El telefono no es valido")
    //console.log("Tiene " + data.telefono01.length + " caracteres")
    //console.log("Es" + data.telefono01+ " el número")
    phone01_isValid = true;
    //data.validate(true);
  }else{
    phone01_isValid = false;
    //data.validate(false);
  }

  //Validamos el número télefonico01 unicamente tenga
  if(data.telefono02.length == 10 || data.telefono02 == ""){
    //console.log("El telefono no es valido")
    //console.log("Tiene " + data.telefono01.length + " caracteres")
    //console.log("Es" + data.telefono01+ " el número")
    phone02_isValid = true;
    //data.validate(true);
  }else{
    phone02_isValid = false;
    //data.validate(false);
  }


  // Validacion de igualdad phone01 y phone02
  if (
    data.telefono01 != data.telefono02 &&
    phone02_isValid &&
    phone01_isValid &&
    data.telefono01 != "" &&
    data.telefono02 != ""
  ) {
    phone02_isTheSameTo_phone01 = true;
    //data.validate(true);

  } else {
    phone02_isTheSameTo_phone01 = false;
    //data.validate(false);

  }

  //Validamos el número télefonico01 unicamente tenga
  if(data.user01.length <= 50 || data.user01 == ""){
    //console.log("El telefono no es valido")
    //console.log("Tiene " + data.telefono01.length + " caracteres")
    //console.log("Es" + data.user01 + "es muy grande")
    user_isValid = true;
    //data.validate(true);
  }else{
    user_isValid = false;
    //data.validate(false);
  }

  useEffect(() => { 

    // Luego de hacer todas las validaciones, actualizamos el estado `validate` si es necesario
    if (
        email01_isValid &&
        email02_isValid &&
        !email02_isTheSameTo_email01 &&
        password01_isValid &&
        password02_isValid &&
        !password02_isTheSameTo_password01 &&
        phone01_isValid &&
        phone02_isValid &&
        !phone02_isTheSameTo_phone01 &&
        user_isValid
      ) {
        data.validate(true);
      } else {
        data.validate(false);
      }

  }, [data, form]);  // Dependencias: ejecutamos el effect cuando cambian `data` o `form`


  return (
    <>
      {/* Validamos en caso que sea el componente del email01*/}
      {!email01_isValid && form == "email01" && (
        <p className="errorRegistro">
          {" "}
          ¡Cuidado! El email <span> {data.email01} </span> aún no es correcto,
          revisa por favor este bien escrito, debe tener esta forma te dejo un
          ejemplo para que te guies: example@email.com, si lo escribes
          correctamente y ya tiene un formato correcto, entonces, desaparecera
          este mensaje
        </p>
      )}

    {/* Validamos en caso que sea el componente del email02*/}
      {!email02_isValid && form == "email02" && (
        <p className="errorRegistro">
          {" "}
          ¡Cuidado! El email <span> {data.email02} </span> aún no es correcto,
          revisa por favor este bien escrito, debe tener esta forma te dejo un
          ejemplo para que te guies: example@email.com, si lo escribes
          correctamente y ya tiene un formato correcto, entonces, desaparecera
          este mensaje
        </p>
      )}

    {/* Validamos en caso que las contaseñas sean validas pero que sean iguales para mostrar mensaje*/}
      {email02_isValid && form == "email02" && email02_isTheSameTo_email01 && (
        <p className="errorRegistro">
          {" "}
          ¡Cuidado! Los email no son iguales, tu primer email:{" "}
          <span> {data.email01} </span> es diferente del segundo email:{" "}
          <span> {data.email02} </span>
        </p>
      )}

      {/* Validamos en caso que sea el componente del password01*/}
      {!password01_isValid && form == "password01" && (
        <p className="errorRegistro">
          {" "}
          ¡Cuidado! El password no es correcto,
          revisa por favor que cumpla con todos los requisitos.
        </p>
      )}

      {/* Validamos en caso que sea el componente del password01*/}
      {!password02_isValid && form == "password02" && (
        <p className="errorRegistro">
          {" "}
          ¡Cuidado! El password de confirmación no es correcto,
          revisa por favor que cumpla con todos los requisitos.
        </p>
      )}

      {/* Validamos en caso que las contaseñas sean validas pero que sean iguales para mostrar mensaje*/}
      {password02_isValid && form == "password02" && password02_isTheSameTo_password01 && (
        <p className="errorRegistro">
          {" "}
          ¡Cuidado! Las contraseñas no son iguales, tu primera contraseña :{" "}
          es diferente de la segunda. Por favor escribelas correctamente{" "}
        </p>
      )}

      {/* Validamos en caso que sea el componente del phone01*/}
      {!phone01_isValid && form == "phone01" && (
        <p className="errorRegistro">
          {" "}
          ¡Cuidado! El télefono <span>{data.telefono01}</span> no tiene 10 digitos, no es un número valido aún, 
          si cumple con los requisitos, desaparecera este mensaje
        </p>
      )}

      {/* Validamos en caso que sea el componente del phone02*/}
      {!phone02_isValid && form == "phone02" && (
        <p className="errorRegistro">
          {" "}
          ¡Cuidado! El télefono <span>{data.telefono02}</span> no tiene 10 digitos, no es un número valido aún, 
          si cumple con los requisitos, desaparecera este mensaje
        </p>
    
    
      )}

      {/* Validamos en caso que los télefonos sean validas pero que sean iguales para mostrar mensaje*/}
      {phone02_isValid && form == "phone02" && phone02_isTheSameTo_phone01 && (
        <p className="errorRegistro">
          {" "}
          ¡Cuidado! Los telefonos no son iguales, tu primer teléfono : <span> {data.telefono01} </span> 
          es diferente del segundo: <span>{data.telefono02}</span>. Por favor escribelas correctamente y que coincidan{" "}
        </p>
      )}

      {/* Validamos en caso que sea el componente del user*/}
      {!user_isValid && form == "user01" && (
        <p className="errorRegistro">
          {" "}
          ¡Cuidado! El usuario es muy largo, debe ser tu nombre menor a 50 caracteres, si tienes tres nombres, 
          prueba poniendo unicamente con dos y si no funciona prueba poniendo solo uno
        </p>
      )}

    </>
  );
};

export default ValidationsAsyn;
