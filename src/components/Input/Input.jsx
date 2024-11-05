import React, { useId } from 'react'
import './Input.css'

const Input = React.forwardRef(({ label, ...props }, ref) => {
  const id = useId()

  return (
    <>
      <label htmlFor={id}>{label || 'Input'}</label>
      <input id={id} ref={ref} type="text" {...props} />
    </>
  )
})

export default Input
