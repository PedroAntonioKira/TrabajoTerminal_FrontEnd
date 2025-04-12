import React from 'react'

const Username = ({ setCustomUser }) => {
  return (
    <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="name@example.com"
            autoComplete="off"
            onChange={(e)=>{setCustomUser(e.target.value)}}
          />
          <label htmlFor="user01">
            Ingresa tu nombre por favor
          </label>
        </div>
  )
}

export default Username