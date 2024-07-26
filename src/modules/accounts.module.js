import {
  incrementField,
  saveToFirestore,
} from '../js/db/firebase/firebaseFirestore'
import {
  loadFromLocalStorage,
  saveToLocalStorage,
} from '../js/db/local/localStorage'
import { getNewId, isUsernameAvailable } from './utils/accounts.module.util'

export async function createAccount(userData) {
  const isUsernameFree = await isUsernameAvailable(userData.user.username)
  if (!isUsernameFree) return { ok: false, error: 'Username already taken' }

  const id = await getNewId()
  userData.id = id

  await incrementField('accounts', '_about', 'amount', 1)
  const saved = await saveToFirestore('accounts', `${id}`, userData)
  login(id)

  return saved
    ? { ok: true, error: false }
    : { ok: false, error: 'Cannot create an account' }
}

function login(id) {
  const localData = loadFromLocalStorage('aj-accounts')

  if (!localData.accounts.active) localData.accounts.active = id
  localData.accounts.accounts.push(id)

  saveToLocalStorage('aj-accounts', localData)
}
