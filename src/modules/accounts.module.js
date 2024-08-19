import {
  incrementField,
  saveToFirestore,
} from '../js/db/firebase/firebaseFirestore'
import { uploadBlob } from '../js/db/firebase/firebaseStorage'
import {
  loadFromLocalStorage,
  saveToLocalStorage,
} from '../js/db/local/localStorage'
import {
  getNewId,
  getNewLogoutLocalData,
  getUserDataByUsername,
  isUserLoggedIn,
  isUsernameAvailable,
} from './utils/accounts.module.util'

export async function createAccount(userData, img) {
  const isUsernameFree = await isUsernameAvailable(userData.user.username)
  if (!isUsernameFree) return { ok: false, error: 'Username already taken' }

  const id = await getNewId()
  userData.id = id

  await incrementField('accounts', '_about', 'amount', 1)
  const saved = await saveToFirestore('accounts', `${id}`, userData)
  login(id)

  if (img) {
    const avatarSaved = await uploadBlob(`users/${id}/avatar`, img)
    if (!avatarSaved) return { ok: false, error: 'Cannot upload avatar' }
  }

  return saved
    ? { ok: true, error: false }
    : { ok: false, error: 'Cannot create an account' }
}

export async function loginAccount(userLocalData) {
  const userData = (await getUserDataByUsername(userLocalData.username))[0]
  if (!userData)
    return {
      ok: false,
      error: 'Username is not registered',
    }

  if (userData.user.password !== userLocalData.password)
    return {
      ok: false,
      error: 'Password is incorrect',
    }

  if (isUserLoggedIn(userData.id))
    return { ok: false, error: 'User is already logged in' }

  login(userData.id)
  return { ok: true }
}

export async function logoutAccount(id) {
  const newLocalData = await getNewLogoutLocalData(id)
  if (newLocalData.ok) {
    saveToLocalStorage('aj-accounts', newLocalData.data)
    return newLocalData
  }
}

function login(id) {
  const localData = loadFromLocalStorage('aj-accounts')

  if (!localData.accounts.active) localData.accounts.active = id
  localData.accounts.accounts.push(id)

  saveToLocalStorage('aj-accounts', localData)
}
