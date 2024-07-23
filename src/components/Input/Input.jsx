import React, { useId } from 'react'

import './Input.css'

const Input = React.forwardRef(({ title, type = 'text', inputProps }, ref) => {
  const inputId = useId()

  return (
    <>
      <div className="list_y_small_very">
        <label htmlFor={inputId}>{title}</label>
        <input ref={ref} id={inputId} type={type} {...inputProps} />
      </div>
    </>
  )
})

export default Input
