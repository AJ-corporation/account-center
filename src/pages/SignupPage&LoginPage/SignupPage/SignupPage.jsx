import { useRef, useState } from 'react'

import SignupPageNames from './components/SignupPageNames'
import SignupPageProfilePic from './components/SignupPageProfilePic'
import SignupPageUsername from './components/SignupPageUsername'
import SignupPagePassword from './components/SignupPagePassword'
import SignupPageFinalInfo from './components/SignupPageFinalInfo'
import Button from '../../../components/Button/Button'

import { goToHref } from '../../../js/utils/href'
import { isDevicePhone } from '../../../js/utils/device'
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
    <SignupPageFinalInfo />,
  ]

  function nextPage(e) {
    e.preventDefault()
    if (!disabled.btn) setCurrentPage(currentPage + 1)
  }

  function previousPage() {
    if (currentPage !== 0) setCurrentPage(currentPage - 1)
  }

  return (
    <>
      <SignupPageContext.Provider
        value={{
          formData,
          setFormData,
          disabled,
          setDisabled,
          setCurrentPage,
          nextPage,
        }}
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
                {currentPage !== pages.length - 1 && (
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
                    {currentPage === 1 && !formData.img && (
                      <Button className="w_max bg_none" onClick={nextPage}>
                        Skip
                      </Button>
                    )}
                    <Button
                      className="w_max clr_btn"
                      disabled={disabled.btn}
                      onClick={nextPage}
                    >
                      Next
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </SignupPageContext.Provider>
    </>
  )
}
