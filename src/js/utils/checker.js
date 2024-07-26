import {
  loadFromLocalStorage,
  saveToLocalStorage,
} from '../db/local/localStorage'

export function appChecker() {
  const localData = loadFromLocalStorage('aj-accounts')
  if (!localData) saveToLocalStorage('aj-accounts', getLocalData())
}

function getLocalData() {
  const data = {
    accounts: {
      active: false,
      accounts: [],
    },
  }

  return data
}

export function isValidUsername(username) {
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
