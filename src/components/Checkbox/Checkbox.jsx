import { useState } from 'react'

import './Checkbox.css'

export default function Checkbox({ text }) {
  const [checked, setChecked] = useState(false)

  return (
    <>
      <div
        className="checkbox_input_area list_x_small d_f_ce"
        onClick={() => setChecked(!checked)}
        isChecked={checked ? 'true' : ''}
      >
        <div className="checkbox_input"></div>
        <span className="checkbox_text">{text}</span>
      </div>
    </>
  )
}
