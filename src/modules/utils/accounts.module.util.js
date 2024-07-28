import {
  loadFromFirestore,
  loadFromFirestoreWhere,
} from '../../js/db/firebase/firebaseFirestore'

export async function isUsernameAvailable(username) {
  const usersData = await getUserDataByUsername(username)

  return usersData && usersData?.length === 0
}

export async function getNewId() {
  const id = (await loadFromFirestore('accounts', '_about')).amount
  return id + 1
}

export async function getUserDataByUsername(username) {
  const usersData = await loadFromFirestoreWhere('accounts', [
    'user.username',
    '==',
    username,
  ])

  return usersData
}
