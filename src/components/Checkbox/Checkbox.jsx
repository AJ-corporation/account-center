import { useState } from 'react'

import './Checkbox.css'

export default function Checkbox({ text, check }) {
  const [checked, setChecked] = useState(false)

  function handleCheck() {
    setChecked(!checked)
    if (check) check(checked)
  }

  return (
    <>
      <div
        className="checkbox_input_area list_x_small d_f_ce"
        onClick={handleCheck}
        isChecked={checked ? 'true' : ''}
      >
        <button className="checkbox_input" tabIndex={0} type="button"></button>
        <span className="checkbox_text">{text}</span>
      </div>
    </>
  )
}
