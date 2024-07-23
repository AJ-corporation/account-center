import { useContext } from 'react'

import Input from '../../../../components/Input/Input'

import { SignupPageContext } from '../SignupPageContext'

export default function SignupPageNames() {
  const { formData, setFormData, nextPage } = useContext(SignupPageContext)

  return (
    <form className="input_area list_y d_f_jc_sb" onSubmit={nextPage}>
      <Input
        title="Username"
        inputProps={{
          autoFocus: true,
          onChange: (e) =>
            setFormData({ ...formData, username: e.target.value }),
          value: formData.username,
        }}
      />
      <button className="d_n"></button>
    </form>
  )
}
