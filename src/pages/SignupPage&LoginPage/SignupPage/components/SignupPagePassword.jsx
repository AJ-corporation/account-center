import { useContext } from 'react'

import Input from '../../../../components/Input/Input'

import { SignupPageContext } from '../SignupPageContext'

export default function SignupPageNames() {
  const { formData, setFormData, nextPage } = useContext(SignupPageContext)

  return (
    <form className="input_area list_y d_f_jc_sb" onSubmit={nextPage}>
      <Input
        title="Password"
        type="password"
        inputProps={{
          autoFocus: true,
          onChange: (e) =>
            setFormData({ ...formData, password: e.target.value }),
          value: formData.password,
        }}
      />
      <Input
        title="Confirm password"
        type="password"
        inputProps={{
          onChange: (e) =>
            setFormData({ ...formData, confirmPassword: e.target.value }),
          value: formData.confirmPassword,
        }}
      />
      <button className="d_n"></button>
    </form>
  )
}
