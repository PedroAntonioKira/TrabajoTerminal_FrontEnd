import React from 'react'

const Email = ({setCustomEmailToConfirmation , textInput, DataUser}) => {
  return (
    <div className="form-floating mb-3">
            <input
              type="email"
              className="form-control"
              placeholder="Ingresa tu Email"
              value={DataUser}
              disabled
              onChange={() => setCustomEmailToConfirmation(DataUser)}
            />
            <label>{textInput}</label>
      </div>
  )
}

export default Email