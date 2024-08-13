import { createContext, useContext, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'

import Avatar from '../../../../components/Avatar/Avatar'
import Button from '../../../../components/Button/Button'

import { goToHref } from '../../../../js/utils/href'
import { toastData } from '../../../../js/utils/toast'
import { trimStrings } from '../../../../js/utils/object'
import { getLocation } from '../../../../js/utils/location'
import { createAccount } from '../../../../modules/accounts.module'
import { SignupPageContext } from '../SignupPageContext'

const SignupPageFinalInfoContext = createContext()

export default function SignupPageFinalInfo() {
  const { disabled, setDisabled, formData, setFormData, setCurrentPage } =
    useContext(SignupPageContext)

  async function create() {
    setDisabled({ ...disabled, form: true })
    const location = await getLocation()

    const imgs = formData.img

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

    userData = { user: trimStrings(userData), img: imgs.file }

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
      <div className="list_y">
        <div className="list_y_small d_f_ai_ce">
          {formData.img && <Avatar img={formData.img.img} />}
          {!formData.img && <Avatar letter={formData.fname[0]} />}
          <SignupPageFinalInfoContext.Provider value={{ setCurrentPage }}>
            <ShowUserData
              i={0}
              data={
                <div className="list_x_small">
                  <span>{formData.fname}</span>
                  {formData.lname && <span>{formData.lname}</span>}
                </div>
              }
            />
            <ShowUserData i={2} data={`@${formData.username}`} />
            <ShowUserData i={3} data={formData.password} isPassword={true} />
          </SignupPageFinalInfoContext.Provider>
        </div>
        <Button className="clr_btn" onClick={create}>
          Create
        </Button>
      </div>
    </>
  )
}

function ShowUserData({ data, isPassword, i }) {
  const [show, setShow] = useState(true)
  const { setCurrentPage } = useContext(SignupPageFinalInfoContext)

  return (
    <div className="signup_login_final_info_con">
      <Button
        className={`pd_small_very d_f_ce ${isPassword ? '' : 'opa_0 p_e_none'}`}
        onClick={() => setShow(!show)}
        tabIndex={isPassword ? 0 : -1}
      >
        <span className="material-symbols-outlined">
          {show ? `visibility` : `visibility_off`}
        </span>
      </Button>
      <div>
        {show && data}
        {!show && (
          <input
            type="password"
            value={data}
            className="signup_login_final_info_input"
            readOnly
          />
        )}
      </div>
      <Button
        className="pd_small_very d_f_ce"
        onClick={() => setCurrentPage(i)}
      >
        <span className="material-symbols-outlined">edit</span>
      </Button>
    </div>
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
