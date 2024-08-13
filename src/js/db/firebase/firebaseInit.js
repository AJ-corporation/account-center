import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const app = initializeApp(JSON.parse(process.env.REACT_APP_FIREBASE))
export const firebaseFirestore = getFirestore(app)
export const firebaseStorage = getStorage(app)
