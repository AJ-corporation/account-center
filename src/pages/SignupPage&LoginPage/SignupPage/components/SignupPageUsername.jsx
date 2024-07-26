import { useContext, useEffect, useState } from 'react'

import Input from '../../../../components/Input/Input'

import { SignupPageContext } from '../SignupPageContext'
import { isValidUsername } from '../../../../js/utils/checker'

export default function SignupPageNames() {
  const [error, setError] = useState('')
  const { disabled, setDisabled, formData, setFormData, nextPage } =
    useContext(SignupPageContext)

  useEffect(() => {
    if (!formData.username) {
      setDisabled({ ...disabled, btn: true })
      setError({ ok: true, error: '' })
      return
    }
    const isValid = isValidUsername(formData.username.trim())

    setDisabled({ ...disabled, btn: !isValid.ok })
    setError(isValid)
  }, [formData.username])

  return (
    <form className="input_area list_y d_f_jc_sb" onSubmit={nextPage}>
      <Input
        title="Username"
        inputProps={{
          autoFocus: true,
          onChange: (e) =>
            setFormData({ ...formData, username: e.target.value }),
          value: formData.username,
        }}
      />
      {!error.ok && (
        <b className="con pd_tb_small txt_bg_red d_f_ce">{error.error}</b>
      )}
      <button className="d_n"></button>
    </form>
  )
}
