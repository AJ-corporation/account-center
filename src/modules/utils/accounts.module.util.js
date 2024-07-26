import {
  loadFromFirestore,
  loadFromFirestoreWhere,
} from '../../js/db/firebase/firebaseFirestore'

export async function isUsernameAvailable(username) {
  const usersData = await loadFromFirestoreWhere('accounts', [
    'username',
    '==',
    username,
  ])

  return usersData && usersData?.length === 0
}

export async function getNewId() {
  const id = (await loadFromFirestore('accounts', '_about')).amount
  return id + 1
}
