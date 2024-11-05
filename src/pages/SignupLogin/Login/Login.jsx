import { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Input from '../../../components/Input/Input'
import Button from '../../../components/Button/Button'
import { checkValidity } from '../SignupLogin'
import { loginUser } from '../../../database/auth/firebase.auth'
import '../SignupLogin.css'
import googleIcon from '../icons/google.svg'
import { useGetCurrentUserFromFirestore } from '../../../hooks/userAuth'

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const disabled = useMemo(() => !checkValidity(formData), [formData])
  const [formDisabled, setFormDisabled] = useState(false)
  const [currentUser] = useGetCurrentUserFromFirestore()
  const navigate = useNavigate()

  useEffect(() => {
    if (currentUser && currentUser !== 'loading' && currentUser !== 'notfound')
      navigate('/dashboard')
  }, [currentUser])

  async function login(e) {
    e.preventDefault()

    setFormDisabled(true)
    await loginUser(formData.email, formData.password)
    setFormDisabled(false)
    navigate('/dashboard')
  }

  return (
    <>
      <div className="full_page_center">
        <div className="signup_login_con">
          <div className="signup_login_title">
            <h1>Login</h1>
            <Link to="/account/signup">
              <Button>Signup</Button>
            </Link>
          </div>
          <hr />
          <form
            className="list_y"
            onSubmit={login}
            disabled={formDisabled || currentUser === 'loading'}
          >
            <Input
              label="Email"
              type="email"
              name="email"
              required
              onInput={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
            <Input
              label="Password"
              type="password"
              value={formData.password}
              required
              minLength="8"
              onInput={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
            <Button
              className="btn_w_100 signup_login_submit_btn"
              disabled={disabled}
            >
              Login
            </Button>
          </form>
          <hr />
          <Button
            className="btn_df_center btn_w_100 list_x"
            disabled={formDisabled || currentUser === 'loading'}
          >
            <img className="icon" src={googleIcon} alt="Google" />
            <span>Google</span>
          </Button>
        </div>
      </div>
    </>
  )
}
