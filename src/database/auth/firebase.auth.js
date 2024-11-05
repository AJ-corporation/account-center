import { firebaseAuth } from '../firebase.init'
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth'

export async function signupUser(email, password) {
  try {
    return createUserWithEmailAndPassword(firebaseAuth, email, password)
      .then((userCredential) => userCredential.user)
      .catch(() => false)
  } catch (error) {
    return false
  }
}

export async function loginUser(email, password) {
  try {
    return await signInWithEmailAndPassword(firebaseAuth, email, password)
      .then((userCredential) => userCredential.user)
      .catch(() => false)
  } catch (error) {
    return false
  }
}

export async function logoutUser() {
  return signOut(firebaseAuth)
    .then(() => true)
    .catch(() => false)
}

export function getCurrentUser() {
  return new Promise((resolve) => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, (user) => {
      unsubscribe()
      if (user) {
        resolve(user)
      } else {
        resolve(false)
      }
    })
  })
}
