import { useEffect, useState } from 'react'

import SignupPageNames from './components/SignupPageNames'
import SignupPageUsername from './components/SignupPageUsername'
import SignupPagePassword from './components/SignupPagePassword'
import Button from '../../../components/Button/Button'

import { SignupPageContext } from './SignupPageContext'
import { goToHref } from '../../../js/utils/href'

import logo from '../../../imgs/logo/logo.jpg'

import './SignupPage.css'

export default function SignupPage() {
  const [currentPage, setCurrentPage] = useState(0)
  const [formData, setFormData] = useState({
    fname: '',
    lname: '',
    username: '',
    password: '',
    confirmPassword: '',
  })
  const [disabled, setDisabled] = useState(true)
  const pages = [
    <SignupPageNames />,
    <SignupPageUsername />,
    <SignupPagePassword />,
  ]

  useEffect(() => {
    if (currentPage === 0) setDisabled(!formData.fname)
    if (currentPage === 1) setDisabled(!formData.username)
    if (currentPage === 2)
      setDisabled(
        (!formData.password && !formData.confirmPassword) ||
          formData.password !== formData.confirmPassword
      )
  }, [
    formData.fname,
    formData.username,
    formData.password,
    formData.confirmPassword,
    currentPage,
  ])

  function nextPage(e) {
    e.preventDefault()

    if (disabled) return
    if (currentPage === pages.length - 1) return create()
    setCurrentPage(currentPage + 1)
  }

  function previousPage() {
    if (currentPage === 0) return
    setCurrentPage(currentPage - 1)
  }

  function create() {
    console.log(formData)
  }

  return (
    <>
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
              <div className="input_area list_y d_f_jc_sb">
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
                    disabled={disabled}
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
