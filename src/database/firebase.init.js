import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getAnalytics } from 'firebase/analytics'
import { getFirestore } from 'firebase/firestore'

const appAccountCenter = initializeApp(
  JSON.parse(process.env.REACT_APP_FIREBASE_CONFIG)
)
const analyticsAccountCenter = getAnalytics(appAccountCenter)
export const firestoreAccountCenter = getFirestore(appAccountCenter)
export const firebaseAuth = getAuth(appAccountCenter)
