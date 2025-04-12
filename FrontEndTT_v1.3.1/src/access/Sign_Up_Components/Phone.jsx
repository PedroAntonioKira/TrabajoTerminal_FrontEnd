import React from 'react'

const Phone = ({customTelefono, setCustomTelefono, textInput}) => {

    const handlePhoneChange = (e) => {
        const value = e.target.value;
        // Permitir solo números
        if (/^\d*$/.test(value)) {
            setCustomTelefono(value);
        }
      };


  return (
    <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="name@example.com"
            autoComplete="off"
            value={customTelefono}
            onChange={handlePhoneChange}
          />
          <label htmlFor="customTelefono01">
            {textInput}
          </label>
    </div>
  )
}

export default Phone