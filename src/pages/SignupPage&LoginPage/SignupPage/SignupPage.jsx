import { useRef, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'

import SignupPageNames from './components/SignupPageNames'
import SignupPageUsername from './components/SignupPageUsername'
import SignupPageProfilePic from './components/SignupPageProfilePic'
import SignupPagePassword from './components/SignupPagePassword'
import Button from '../../../components/Button/Button'

import { goToHref } from '../../../js/utils/href'
import { toastData } from '../../../js/utils/toast'
import { trimStrings } from '../../../js/utils/object'
import { getLocation } from '../../../js/utils/location'
import { isDevicePhone } from '../../../js/utils/device'
import { createAccount } from '../../../modules/accounts.module'
import { SignupPageContext } from './SignupPageContext'

import logo from '../../../imgs/logo/logo.jpg'

import './SignupPage.css'
import 'react-toastify/dist/ReactToastify.css'

export default function SignupPage() {
  const isPhone = useRef(isDevicePhone()).current
  const [currentPage, setCurrentPage] = useState(0)
  const [formData, setFormData] = useState({
    fname: '',
    lname: '',
    username: '',
    password: '',
    img: '',
    confirmPassword: '',
  })
  const [disabled, setDisabled] = useState({ btn: true, form: false })
  const pages = [
    <SignupPageNames />,
    <SignupPageProfilePic />,
    <SignupPageUsername />,
    <SignupPagePassword />,
  ]

  function nextPage(e) {
    e.preventDefault()

    if (disabled.btn) return
    if (currentPage === pages.length - 1) return create()
    setCurrentPage(currentPage + 1)
  }

  function previousPage() {
    if (currentPage === 0) return
    setCurrentPage(currentPage - 1)
  }

  async function create() {
    setDisabled({ ...disabled, form: true })
    const location = await getLocation()

    const img = formData.img

    const userFormData = getUserData(formData)
    if (!userFormData.ok) {
      toast.error(userFormData.error)
      setDisabled({ ...disabled, form: false })
      return
    }

    let userData = {
      user: userFormData.userData,
      joinded: new Date().getTime(),
      location,
    }

    userData = { user: trimStrings(userData), img }

    const created = await createAccount(userData.user, userData.img)
    if (!created.ok) {
      toast.error(created.error)
      setDisabled({ ...disabled, form: false })

      setFormData({ ...formData, confirmPassword: formData.password })
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
      <SignupPageContext.Provider
        value={{ formData, setFormData, disabled, setDisabled, nextPage }}
      >
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
                <h1 className="title">Create account</h1>
              </div>
              <Button onClick={() => goToHref('/accounts/login')}>Login</Button>
            </div>
            <hr />
            <div className="list_x d_f_jc_sb">
              {!isPhone && (
                <img className="signup_login_logo" src={logo} alt="Logo" />
              )}
              <div
                className="input_area list_y d_f_jc_sb"
                disabled={disabled.form}
              >
                {pages[currentPage]}
                <div className="d_f_jc_end list_x_small">
                  {currentPage > 0 && (
                    <Button
                      className="w_max bg_none"
                      disabled={currentPage === 0}
                      onClick={previousPage}
                    >
                      Previous
                    </Button>
                  )}
                  {currentPage === 1 && (
                    <Button
                      className="w_max bg_none"
                      onClick={() => setCurrentPage(currentPage + 1)}
                    >
                      Skip
                    </Button>
                  )}
                  <Button
                    className="w_max clr_btn"
                    disabled={disabled.btn}
                    onClick={nextPage}
                  >
                    {currentPage === pages.length - 1 ? 'Create' : 'Next'}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SignupPageContext.Provider>
    </>
  )
}

function getUserData(userData) {
  if (userData.fname.length > 20 || userData?.lname?.length > 20)
    return { ok: false, error: 'Name is too long' }
  if (userData.username.length > 30)
    return { ok: false, error: 'Username is too long' }

  delete userData.confirmPassword
  delete userData.img

  if (!userData.lname) delete userData.lname
  return { ok: true, userData }
}
