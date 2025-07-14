import React from 'react'

const EmailNoDirect = ({setCustomEmailToConfirmation , textInput, customEmailToConfirmation}) => {
  return (
    <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Ingresa tu Email"
              value={customEmailToConfirmation}
              onChange={(e) => setCustomEmailToConfirmation(e.target.value)}
            />
            <label>{textInput}</label>
          </div>
  )
}

export default EmailNoDirect