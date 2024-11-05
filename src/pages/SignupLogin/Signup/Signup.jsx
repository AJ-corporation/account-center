import { useEffect, useMemo, useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import Input from '../../../components/Input/Input'
import Button from '../../../components/Button/Button'
import { checkValidity, prepareUserData } from '../SignupLogin'
import { setToFirestore } from '../../../database/firebase.firestore'
import { signupUser } from '../../../database/auth/firebase.auth'
import { useGetCurrentUserFromFirestore } from '../../../hooks/userAuth'
import '../SignupLogin.css'
import googleIcon from '../icons/google.svg'

export default function Signup() {
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const disabled = useMemo(() => !checkValidity(formData), [formData])
  const [formDisabled, setFormDisabled] = useState(false)
  const [currentUser] = useGetCurrentUserFromFirestore()
  const navigate = useNavigate()

  useEffect(() => {
    if (currentUser && currentUser !== 'loading' && currentUser !== 'notfound')
      navigate('/dashboard')
  }, [currentUser])

  async function signup(e) {
    e.preventDefault()
    setFormDisabled(true)

    const userAccount = await signupUser(formData.email, formData.password)
    if (userAccount) {
      const userData = await prepareUserData()

      await setToFirestore(`users/${userAccount.uid}`, {
        ...userData,
        user: {
          name: formData.name.trim(),
          email: formData.email.trim(),
          username: formData.username.trim(),
        },
      })
    }
    setFormDisabled(false)
    navigate('/dashboard')
  }

  return (
    <>
      <div className="full_page_center">
        <div className="signup_login_con">
          <div className="signup_login_title">
            <h1>Signup</h1>
            <Link to="/account/login">
              <Button>Login</Button>
            </Link>
          </div>
          <hr />
          <form
            className="list_y"
            onSubmit={signup}
            disabled={formDisabled || currentUser === 'loading'}
          >
            <Input
              label="Name"
              type="name"
              required
              onInput={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
            <Input
              label="Username"
              type="username"
              required
              onInput={(e) =>
                setFormData({ ...formData, username: e.target.value })
              }
            />
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
              required
              minLength="8"
              value={formData.password}
              onInput={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
            <Input
              label="Confirm password"
              type="password"
              required
              minLength="8"
              value={formData.confirmPassword}
              onInput={(e) =>
                setFormData({ ...formData, confirmPassword: e.target.value })
              }
            />
            <Button
              className="btn_w_100 signup_login_submit_btn"
              disabled={disabled}
            >
              Signup
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
