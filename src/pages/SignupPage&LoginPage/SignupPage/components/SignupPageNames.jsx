import { useContext } from 'react'

import Input from '../../../../components/Input/Input'

import { SignupPageContext } from '../SignupPageContext'

export default function SignupPageNames() {
  const { formData, setFormData, nextPage } = useContext(SignupPageContext)

  return (
    <form className="input_area list_y d_f_jc_sb" onSubmit={nextPage}>
      <Input
        title={
          <div>
            <span>First name</span>
            <span> </span>
            <span className="txt_red">*</span>
          </div>
        }
        inputProps={{
          autoFocus: true,
          onChange: (e) => setFormData({ ...formData, fname: e.target.value }),
          value: formData.fname,
        }}
      />
      <Input
        title="Last name"
        inputProps={{
          onChange: (e) => setFormData({ ...formData, lname: e.target.value }),
          value: formData.lname,
        }}
      />
      <button className="d_n"></button>
    </form>
  )
}
