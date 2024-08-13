import { useContext, useEffect } from 'react'

import AvatarEdit from '../../../../components/Avatar/AvatarEdit'

import { SignupPageContext } from '../SignupPageContext'

export default function SignupPageProfilePic() {
  const { setDisabled, nextPage, formData, setFormData } =
    useContext(SignupPageContext)

  useEffect(() => {
    setDisabled((prev) => ({ ...prev, btn: false }))
  }, [])

  useEffect(() => {
    function allowEnter(e) {
      if (formData.img && e.key === 'Enter') nextPage(e)
    }

    window.addEventListener('keyup', allowEnter)
    return () => {
      window.removeEventListener('keyup', allowEnter)
    }
  }, [formData.img])

  return (
    <>
      <AvatarEdit formData={formData} setFormData={setFormData} />
    </>
  )
}
