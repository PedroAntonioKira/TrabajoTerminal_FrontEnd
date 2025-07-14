  import React from 'react'
  
  const Sign_In = ({ onSwitch }) => {
    return (
        <div className="formulario fade-in">
          <h2>Registro de Usuarios</h2>
          <form>
            <label>
              Correo:
              <input type="text" placeholder="Ingresa tu nombre" />
            </label>
            <label>
              Contraseña:
              <input type="email" placeholder="Ingresa tu correo" />
            </label>
            <button type="button"  className='button-prueba'>Iniciar Sesion</button>
            <button type="button" onClick={(e)=>{onSwitch(2, "Sign_In","")}} className='button-prueba'>Registrarse</button>
          </form>
        </div>
      );
  }
  
  export default Sign_In