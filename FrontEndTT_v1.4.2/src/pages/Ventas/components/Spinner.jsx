import React from 'react';
import "../Styles/Spinner.css"; // Asegúrate de tener este archivo

const Spinner = () => {
  return (
    <div className="overlay-spinner">
      <div className="spinner-border text-light" role="status" style={{ width: '3rem', height: '3rem' }}>
        <span className="visually-hidden">Cargando...</span>
      </div>
      <p className="text-white mt-3">Guardando cambios...</p>
    </div>
  );
};

export default Spinner;
