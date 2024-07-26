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
