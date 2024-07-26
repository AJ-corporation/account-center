import { API } from '../../api/api'
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const app = initializeApp(API.firebaseConfig)
export const firebaseFirestore = getFirestore(app)
