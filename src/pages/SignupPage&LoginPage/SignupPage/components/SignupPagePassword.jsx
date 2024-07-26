import { useContext, useEffect, useState } from 'react'

import Input from '../../../../components/Input/Input'

import { SignupPageContext } from '../SignupPageContext'
import { isValidPassword } from '../../../../js/utils/checker'

export default function SignupPageNames() {
  const [error, setError] = useState('')
  const { disabled, setDisabled, formData, setFormData, nextPage } =
    useContext(SignupPageContext)

  useEffect(() => {
    if (!formData.password || !formData.confirmPassword) {
      setDisabled({ ...disabled, btn: true })
      setError({ ok: true, error: '' })
      return
    }
    const isValid = isValidPassword(formData.password, formData.confirmPassword)

    setDisabled({ ...disabled, btn: !isValid.ok })
    setError(isValid)
  }, [formData.password, formData.confirmPassword])

  return (
    <form className="input_area list_y d_f_jc_sb" onSubmit={nextPage}>
      <Input
        title="Password"
        type="password"
        inputProps={{
          autoFocus: true,
          onChange: (e) =>
            setFormData({ ...formData, password: e.target.value }),
          value: formData.password,
        }}
      />
      <Input
        title="Confirm password"
        type="password"
        inputProps={{
          onChange: (e) =>
            setFormData({ ...formData, confirmPassword: e.target.value }),
          value: formData.confirmPassword,
        }}
      />
      {!error.ok && (
        <b className="con pd_tb_small txt_bg_red d_f_ce signup_login_error_txt">
          {error.error}
        </b>
      )}
      <button className="d_n"></button>
    </form>
  )
}
