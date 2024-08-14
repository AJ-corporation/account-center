import { useContext, useEffect } from 'react'

import AvatarEdit from '../../../../components/Avatar/AvatarEdit'

import { SignupPageContext } from '../SignupPageContext'

export default function SignupPageProfilePic() {
  const { setDisabled, formData, setFormData } = useContext(SignupPageContext)

  useEffect(() => {
    setDisabled((prev) => ({ ...prev, btn: false }))
  }, [])

  return (
    <>
      <form>
        <AvatarEdit formData={formData} setFormData={setFormData} />
      </form>
    </>
  )
}
