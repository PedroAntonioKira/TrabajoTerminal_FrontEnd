import React from 'react'

let instruction =""
let email =""

const Instruction = ({typeMenssage}) => {

    {
      /*
      if(typeMenssage="email"){
        return (
          <p className="mensaje">¡Recuerda! &#128539; que el correo electronico debe ser tuyo, ya que este representa tu cuenta y con el sera con el que podras acceder, protege tus datos &#9996;</p>
        )
      }*/

        switch (typeMenssage) {
          case "email":
              return (
              <p className="mensaje">
                ¡Recuerda! &#128539; que el correo electrónico debe ser tuyo, ya que este representa tu cuenta y con él será con el que podrás acceder, 
                protege tus datos &#9996;
              </p>
              );
          case "password":
            return (
              <p className="mensaje">
                ¡Recuerda! &#128521; que la contraseña debe tener exactamente 8
                caracteres, debe tener al menos un número, una letra mayúscula, una
                letra minúscula y al menos incluir un simbolo especial &#128272; como los
                que te muestro a continuación: ( $ # & % ¡ ¿ ? ! ) ~ [ ] /
              </p>
            );
          case "phone":
            return (
              <p className="mensaje">
                ¡Recuerda! &#128522; que el télefono debe ser de México, es decir con
                +52, es importante mencionar que el +52 no deberas ingresarlo ya que el sistema tomará en automatico la LADA, pero la aplicación esta destinada para usuarios de mexico
                de la colonia Renacimiento y sus alrededores, por lo cual en caso de querer usar un télefonico
                con una LADA diferente a la de México no seria registrado de forma correcta,
                recuerda que es obligatorio y unicamente cumpliendo este requisito deberás
                ingresar nada más los 10 digitos de tu telefono, es decir por ejemplo:
                5512345678 &#128241; &#128072; Unicamente ingresa puros números, no te permitira ingresar letras.
              </p>
            );
          case "rolUser":
            return (
              <p className="mensaje estilosRol">
                ¡Recuerda! &#128516; que si te registras con un rol de Cliente, es porque Usará el sistema para ver los productos cerca de aqui y poder
                comprar, teniendo al alcance de tu mano el saber todo lo que venden cerca de ti de una manera comoda y ayudando a los negocios locales, &#129333;
                pero si te registras con un rol de venedor es porque Usarás el sistema publicar sus productos y poder venderlos para expandir
                digitalmente tu negocio, confirmando tiene un pequeño negocio minorista &#128200; &#128178;
              </p>
            );
          case "username":
            return (
              <p className="mensaje">
                ¡Recuerda! &#129299; que el nombre ayudará a identificarlos como usuarios del sistema, 
                por lo cual te pedimos por favor no uses alias o nombres falsos. &#128586; &#128274;
              </p>
            );
          case "description":
            return (
              <p>
                Por favor complete el siguiente formulario dando click en cada campo
                ingresando lo que se le solicita y posteriormente seleccione el botón de
                registrar de la parte de hasta abajo
              </p>
            );
          case "emailConfirmationDirect":
              return (
                <p className="mensaje">
                  El email que aparece ahora es autocompletado para que solo confirme con el token que fue mandado a su correo. &#128512;
                  Por favor verifique que el email que aparece ya escrito sea correcto, ya que proviene del registro anterior
                </p>
              );
          case "emailConfirmationNoDirect":
                return (
                  <p className="mensaje">
                    Por favor complete el siguiente formulario colocando el correo con el cual se registro en el sistema &#129299;
                    que es asu vez el correo donde le mandaron el token de confirmación
                  </p>
                );
          case "TokenConfirmation":
                  return (
                    <p className="mensaje">
                      Por favor complete el el campo con el token que se le envío por correo electronico &#128232;
                      en caso no verlo busque en Spam, en caso de que haya caducado genére por favor uno nuevo
                    </p>
                  );
          default:
              return (
                  <p className="mensaje">ERROR: El tipo de mensaje no es válido.</p>
              );
      }
      
    }
}

export default Instruction