import React, { useState } from 'react';
import Sign_In from "./Sign_In";
import Sign_Up from "./Sign_Up";
import Confirmation_Email from './Confirmation_Email';
import './Principal.css';

const Login = () => {
    const [currentForm, setCurrentForm] = useState(1);
    const [customPrevPage, setcustomPrevPage] = useState("");
    const [customDataUser01, setcustomDataUser01] = useState("");

    const switchForm = (secciónAVer, paginaOrigen, dataUser) => {
      //setCurrentForm((prevForm) => (prevForm === 1 ? 2 : 1));
      setCurrentForm(secciónAVer);
      setcustomPrevPage(paginaOrigen)
      setcustomDataUser01(dataUser)
    };


  
    return (
      <>
      <div className='contenedorRegistro'>
        {currentForm === 1 ? (
          <Sign_In onSwitch={switchForm} />
        ) : (
          currentForm === 2 ? (
            <Sign_Up onSwitch={switchForm} />
          ):  <Confirmation_Email onSwitch={switchForm} prevPage={customPrevPage} DataUser={customDataUser01} />
        )}
      </div>
      </>
    );
}

export default Login