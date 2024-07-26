import { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'

import Input from '../../../components/Input/Input'
import Button from '../../../components/Button/Button'

import { goToHref } from '../../../js/utils/href'
import { toastData } from '../../../js/utils/toast'
import { trimStrings } from '../../../js/utils/object'
import { loginAccount } from '../../../modules/accounts.module'
import { isValidPassword, isValidUsername } from '../../../js/utils/checker'

import logo from '../../../imgs/logo/logo.jpg'

import './LoginPage.css'
import 'react-toastify/dist/ReactToastify.css'

export default function LoginPage() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  })
  const [error, setError] = useState('')
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
        <div className="signup_login_con con_bg_df list_y">
          <div className="d_f_jc_sb d_f_ai_ce">
            <h1 className="title">Login account</h1>
            <Button onClick={() => goToHref('/accounts/signup')}>
              Sign up
            </Button>
          </div>
          <hr />
          <div className="list_x d_f_jc_sb">
            <img className="signup_login_logo" src={logo} alt="Logo" />
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
                  }}
                />
                <Input
                  title="Password"
                  type="password"
                  inputProps={{
                    onChange: (e) =>
                      setFormData({ ...formData, password: e.target.value }),
                  }}
                />
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
