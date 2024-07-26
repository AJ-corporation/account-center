import { useEffect, useState } from 'react'

import Input from '../../../components/Input/Input'
import Button from '../../../components/Button/Button'

import { goToHref } from '../../../js/utils/href'

import logo from '../../../imgs/logo/logo.jpg'

import './LoginPage.css'

export default function LoginPage() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  })
  const [disabled, setDisabled] = useState({ btn: true, form: false })

  useEffect(() => {
    setDisabled({ ...disabled, btn: !formData.username || !formData.password })
  }, [formData.username, formData.password])

  function login(e) {
    e.preventDefault()
    setDisabled({ ...disabled, form: true })
    console.log(formData)
  }

  return (
    <>
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
