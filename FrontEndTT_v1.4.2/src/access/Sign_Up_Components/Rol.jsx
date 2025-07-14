import React from 'react'

const Rol = ( {setCustomUserType} ) => {
  return (
    <div className="form-floating">
          <select
            className="form-select"
            aria-label="Floating label select example 02"
            onChange={(e)=>{setCustomUserType(e.target.value)}}
          >
            <option defaultValue="Cliente">
              Cliente
            </option>
            <option value="Vendedor">
              Vendedor
            </option>
          </select>
          <label>Selecciona el rol que desempeñarías</label>
    </div>
  )
}

export default Rol