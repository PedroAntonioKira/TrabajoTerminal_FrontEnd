import React from 'react'

const Token = ({handleTokenChange, customToken01}) => {
  return (
    <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Ingresa tu Token de confirmación"
              value={customToken01}
              onChange={handleTokenChange}
            />
            <label>Token:</label>
          </div>
  )
}

export default Token