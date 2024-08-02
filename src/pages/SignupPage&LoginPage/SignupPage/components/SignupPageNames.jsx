import { useContext, useEffect } from 'react'

import Input from '../../../../components/Input/Input'

import { SignupPageContext } from '../SignupPageContext'

export default function SignupPageNames() {
  const { disabled, setDisabled, formData, setFormData, nextPage } =
    useContext(SignupPageContext)

  useEffect(() => {
    setDisabled({ ...disabled, btn: !formData.fname })
  }, [formData.fname])

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
          maxLength: 20,
        }}
      />
      <Input
        title="Last name"
        inputProps={{
          onChange: (e) => setFormData({ ...formData, lname: e.target.value }),
          value: formData.lname,
          maxLength: 20,
        }}
      />
      <button className="d_n"></button>
    </form>
  )
}
