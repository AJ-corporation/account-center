import { getUserLocation } from '../../utils/js/getUserLocation'
import { validEmail } from '../../utils/js/validator/valid.email'

export function checkValidity(formData) {
  let validPart = formData.password.length >= 8 && validEmail(formData.email)

  if (formData.hasOwnProperty('username')) {
    validPart = validPart && formData.username.length
  }
  if (formData.hasOwnProperty('confirmPassword')) {
    validPart = validPart && formData.password === formData.confirmPassword
  }
  return validPart
}

export async function prepareUserData() {
  const newUserData = {}
  newUserData.joined = new Date().getTime()

  const location = await getUserLocation()
    .then((res) => res)
    .catch((err) => err)
  if (location) newUserData.location = location

  return newUserData
}
