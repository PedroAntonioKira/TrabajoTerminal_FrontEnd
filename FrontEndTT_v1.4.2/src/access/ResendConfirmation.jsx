import React, { useState } from 'react';
import { resendConfirmationCode } from '../api/resendConfirmation';
import { useNavigate } from "react-router-dom";
import './stylesAccess/ResendConfirmation.css';

const ResendConfirmation = () => {
  const [email, setEmail] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState('');
  const [cargando, setCargando] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje('');
    setError('');

    if (!email.includes('@') || !email.includes('.')) {
      setError('Por favor ingresa un correo válido');
      return;
    }

    setCargando(true);
    try {
      const respuesta = await resendConfirmationCode(email);
      setMensaje(respuesta.message);
    } catch (err) {
      setError('Error al reenviar el código. Intenta más tarde.');
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="EmailRegistro"> 
        <div className="contenedorRegistro">
            <div className="resend-container">
            <h2>Reenviar Código de Confirmación</h2>
            <form onSubmit={handleSubmit} className="resend-form">
                <input
                type="email"
                placeholder="Correo electrónico"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                />
                <div className="botones_resend">
                    <button type="submit" disabled={cargando} className='btn btn-primary'>
                    {cargando ? 'Enviando...' : 'Reenviar Código'}
                    </button>
                    <button type="button" className="btn btn-secondary" onClick={() => navigate("../")}>Cancelar</button>
                </div>
            </form>
            {mensaje && <p className="mensaje-exito">{mensaje}</p>}
            {error && <p className="mensaje-error">{error}</p>}
            </div>
        </div>
    </div>
  );
};

export default ResendConfirmation;
