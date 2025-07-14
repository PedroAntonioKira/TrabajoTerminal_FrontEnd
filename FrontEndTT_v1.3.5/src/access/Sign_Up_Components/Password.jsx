import React from 'react'

const Password = ( {setCustomPassword , textInput} ) => {
  return (
    <div className="form-floating mb-3">
          <input
            type="password"
            className="form-control"
            placeholder="name@example.com"
            autoComplete="off"
            onChange={(e)=>{setCustomPassword(e.target.value)}}
          />
          <label htmlFor="password01">
            {textInput}
          </label>
    </div>
  )
}

export default Password