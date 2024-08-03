import { useContext, useEffect, useState } from 'react'

import Input from '../../../../components/Input/Input'
import Button from '../../../../components/Button/Button'
import Checkbox from '../../../../components/Checkbox/Checkbox'

import { SignupPageContext } from '../SignupPageContext'
import { isValidPasswords } from '../../../../js/utils/checker'
import { getStrongPassword } from '../../../../js/utils/password'

export default function SignupPageNames() {
  const [error, setError] = useState('')
  const [showPasswords, setShowPasswords] = useState(false)
  const { disabled, setDisabled, formData, setFormData, nextPage } =
    useContext(SignupPageContext)

  useEffect(() => {
    if (!formData.password || !formData.confirmPassword) {
      setDisabled({ ...disabled, btn: true })
      setError({ ok: true, error: '' })
      return
    }
    const isValid = isValidPasswords(
      formData.password,
      formData.confirmPassword
    )

    setDisabled({ ...disabled, btn: !isValid.ok })
    setError(isValid)
  }, [formData.password, formData.confirmPassword])

  function setStrongPassword() {
    const password = getStrongPassword(12)
    setFormData({ ...formData, password, confirmPassword: password })
  }

  return (
    <form className="input_area list_y d_f_jc_sb" onSubmit={nextPage}>
      <Input
        title="Password"
        type={showPasswords ? 'text' : 'password'}
        inputProps={{
          autoFocus: true,
          onChange: (e) =>
            setFormData({ ...formData, password: e.target.value }),
          value: formData.password,
        }}
      />
      <Input
        title="Confirm password"
        type={showPasswords ? 'text' : 'password'}
        inputProps={{
          onChange: (e) =>
            setFormData({ ...formData, confirmPassword: e.target.value }),
          value: formData.confirmPassword,
        }}
      />
      <div className="d_f_jc_sb">
        <Checkbox
          text="Show passwords"
          check={(checked) => setShowPasswords(!checked)}
        />
        <Button className="clr_btn" onClick={setStrongPassword} type="button">
          strong passwort
        </Button>
      </div>
      {!error.ok && (
        <b className="con pd_tb_small txt_bg_red d_f_ce signup_login_error_txt">
          {error.error}
        </b>
      )}
      <button className="d_n"></button>
    </form>
  )
}
