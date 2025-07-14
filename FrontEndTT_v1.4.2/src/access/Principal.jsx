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
        <Sign_In />
      </div>
      </>
    );
}

export default Login