import {
  loadFromLocalStorage,
  saveToLocalStorage,
} from '../db/local/localStorage'
import { isDevicePhone } from './device'
import { getLocalData } from './checker.util'

export function appChecker() {
  const localData = loadFromLocalStorage('aj-accounts')
  if (!localData) saveToLocalStorage('aj-accounts', getLocalData())

  const isPhone = isDevicePhone()
  if (isPhone) document.body.classList.add('is_phone')
}

export function isValidUsername(username) {
  if (!username) return { ok: false, error: 'Username is required' }

  if (!isNaN(parseInt(username[0]))) {
    return {
      ok: false,
      error: 'Username cannot start with a number',
    }
  }

  if (/\s/.test(username)) {
    return { ok: false, error: 'Username must not contain spaces' }
  }

  const usernameRegex = /^[a-zA-Z_][a-zA-Z0-9_]*$/
  if (!usernameRegex.test(username)) {
    return { ok: false, error: 'Username contains an invalid character' }
  }

  return { ok: true }
}

export function isValidPasswords(password, confirmPassword) {
  if (!password) return { ok: false, error: 'Password is required' }

  if (password !== confirmPassword) {
    return { ok: false, error: 'Passwords do not match' }
  }

  return { ok: true }
}

export function isValidPassword(password) {
  if (!password) return { ok: false, error: 'Password is not valid' }
  return { ok: true }
}
