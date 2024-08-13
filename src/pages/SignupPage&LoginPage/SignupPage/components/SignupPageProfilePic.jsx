import { useContext, useEffect } from 'react'

import AvatarEdit from '../../../../components/Avatar/AvatarEdit'

import { SignupPageContext } from '../SignupPageContext'

export default function SignupPageProfilePic() {
  const { setDisabled, formData, setFormData } = useContext(SignupPageContext)

  useEffect(() => {
    setDisabled((prev) => ({ ...prev, btn: !formData.img }))
  }, [formData.img])

  return (
    <>
      <AvatarEdit setFormData={setFormData} />
    </>
  )
}
