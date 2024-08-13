import { useContext, useEffect } from 'react'

import AvatarEdit from '../../../../components/Avatar/AvatarEdit'

import { SignupPageContext } from '../SignupPageContext'

export default function SignupPageProfilePic() {
  const { setDisabled, skipPage, formData, setFormData } =
    useContext(SignupPageContext)

  useEffect(() => {
    function allowEnter(e) {
      if (formData.img && e.key === 'Enter') skipPage()
    }
    setDisabled((prev) => ({ ...prev, btn: !formData.img }))

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
