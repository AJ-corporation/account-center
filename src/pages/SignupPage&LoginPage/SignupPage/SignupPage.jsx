import { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'

import SignupPageNames from './components/SignupPageNames'
import SignupPageUsername from './components/SignupPageUsername'
import SignupPagePassword from './components/SignupPagePassword'
import Button from '../../../components/Button/Button'

import { SignupPageContext } from './SignupPageContext'
import { goToHref } from '../../../js/utils/href'
import { getLocation } from '../../../js/utils/location'
import { toastData } from '../../../js/utils/toast'
import { createAccount } from '../../../modules/accounts.module'
import { trimStrings } from '../../../js/utils/object'

import logo from '../../../imgs/logo/logo.jpg'

import './SignupPage.css'
import 'react-toastify/dist/ReactToastify.css'

export default function SignupPage() {
  const [currentPage, setCurrentPage] = useState(0)
  const [formData, setFormData] = useState({
    fname: '',
    lname: '',
    username: '',
    password: '',
    confirmPassword: '',
  })
  const [disabled, setDisabled] = useState({ btn: true, form: false })
  const pages = [
    <SignupPageNames />,
    <SignupPageUsername />,
    <SignupPagePassword />,
  ]

  useEffect(() => {
    if (currentPage === 0) setDisabled({ ...disabled, btn: !formData.fname })
    if (currentPage === 1) setDisabled({ ...disabled, btn: !formData.username })
    if (currentPage === 2)
      setDisabled({
        ...disabled,
        btn:
          (!formData.password && !formData.confirmPassword) ||
          formData.password !== formData.confirmPassword,
      })
  }, [
    formData.fname,
    formData.username,
    formData.password,
    formData.confirmPassword,
    currentPage,
  ])

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

    const userData = {
      user: getUserData(formData),
      joinded: new Date().getTime(),
      location,
    }

    const created = await createAccount(trimStrings(userData))
    if (!created.ok) {
      toast.error(created.error)
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
      <SignupPageContext.Provider value={{ formData, setFormData, nextPage }}>
        <div className="full_page d_f_ce">
          <div className="signup_login_con con_bg_df list_y">
            <div className="d_f_jc_sb d_f_ai_ce">
              <h1 className="title">Create account</h1>
              <Button onClick={() => goToHref('/accounts/login')}>Login</Button>
            </div>
            <hr />
            <div className="list_x d_f_jc_sb">
              <img className="signup_login_logo" src={logo} alt="Logo" />
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
                  <Button
                    className="w_max signup_login_clr_btn"
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
  delete userData.confirmPassword

  if (!userData.lname) delete userData.lname
  return userData
}
