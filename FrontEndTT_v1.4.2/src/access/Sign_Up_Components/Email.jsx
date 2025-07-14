import React from 'react'

const Email = ( {setCustomEmail , textInput} ) => {
  return (
    <div className="form-floating mb-3">
          <input
            type="email"
            className="form-control"
            placeholder="name@example.com"
            autoComplete="off"
            onChange={(e)=>{setCustomEmail(e.target.value)}}
          />
          <label htmlFor="email">
            {textInput}
          </label>
    </div>
  )
}

export default Email