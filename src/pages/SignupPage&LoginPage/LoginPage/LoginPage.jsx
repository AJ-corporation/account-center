import { useEffect, useRef, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'

import Input from '../../../components/Input/Input'
import Button from '../../../components/Button/Button'
import Checkbox from '../../../components/Checkbox/Checkbox'

import { goToHref } from '../../../js/utils/href'
import { toastData } from '../../../js/utils/toast'
import { trimStrings } from '../../../js/utils/object'
import { isDevicePhone } from '../../../js/utils/device'
import { loginAccount } from '../../../modules/accounts.module'
import { isValidPassword, isValidUsername } from '../../../js/utils/checker'

import logo from '../../../imgs/logo/logo.jpg'

import './LoginPage.css'
import 'react-toastify/dist/ReactToastify.css'

export default function LoginPage() {
  const isPhone = useRef(isDevicePhone()).current
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  })
  const [error, setError] = useState('')
  const [showPasswords, setShowPasswords] = useState(false)
  const [disabled, setDisabled] = useState({ btn: true, form: false })

  useEffect(() => {
    if (!formData.username || !formData.password) {
      setDisabled({ ...disabled, btn: true })
      setError({ ok: true, error: '' })
      return
    }

    const getError = getLoginError(
      isValidUsername(formData.username.trim()),
      isValidPassword(formData.password.trim())
    )

    setError(getError)
    setDisabled({ ...disabled, btn: !getError.ok })
  }, [formData.username, formData.password])

  async function login(e) {
    e.preventDefault()
    setDisabled({ ...disabled, form: true })

    const loggedIn = await loginAccount(trimStrings(formData))
    if (!loggedIn.ok) {
      toast.error(loggedIn.error)
      setDisabled({ ...disabled, form: false })
      return
    }

    goToHref('/')
  }

  return (
    <>
      <ToastContainer
        position={toastData.position}
        autoClose={toastData.autoClose}
        theme={toastData.theme}
        draggable
      />
      <div className="full_page d_f_ce">
        <div
          className="signup_login_con con_bg_df list_y"
          phone={isPhone ? 'true' : ''}
        >
          <div className="d_f_jc_sb d_f_ai_ce">
            <div className="list_x d_f_ce">
              {isPhone && (
                <img className="signup_login_logo" src={logo} alt="Logo" />
              )}
              <h1 className="title">Login account</h1>
            </div>
            <Button onClick={() => goToHref('/accounts/signup')}>
              Sign up
            </Button>
          </div>
          <hr />
          <div className="list_x d_f_jc_sb">
            {!isPhone && (
              <img className="signup_login_logo" src={logo} alt="Logo" />
            )}
            <div className="input_area list_y d_f_jc_sb">
              <form
                className="input_area list_y d_f_jc_sb"
                onSubmit={login}
                disabled={disabled.form}
              >
                <Input
                  title="Username"
                  inputProps={{
                    autoFocus: true,
                    onChange: (e) =>
                      setFormData({ ...formData, username: e.target.value }),
                    maxLength: 30,
                  }}
                />
                <Input
                  title="Password"
                  type={showPasswords ? 'text' : 'password'}
                  inputProps={{
                    onChange: (e) =>
                      setFormData({ ...formData, password: e.target.value }),
                  }}
                />
                <div className="d_f_jc_start">
                  <Checkbox
                    text="Show password"
                    check={(checked) => setShowPasswords(!checked)}
                  />
                </div>
                {!error.ok && (
                  <b className="con pd_tb_small txt_bg_red d_f_ce signup_login_error_txt">
                    {error.error}
                  </b>
                )}
                <Button
                  className="signup_login_clr_btn"
                  disabled={disabled.btn}
                >
                  Login
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

function getLoginError(isValidUsername, isValidPassword) {
  if (!isValidUsername.ok) return isValidUsername
  if (!isValidPassword.ok) return isValidPassword
  return { ok: true }
}
