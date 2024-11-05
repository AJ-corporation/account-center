import { doc, getDoc, setDoc } from 'firebase/firestore'
import { firestoreAccountCenter } from './firebase.init'

export async function setToFirestore(path, data) {
  try {
    const pathCollection = path.split('/')[0]
    const pathDocument = path.split('/')[1]

    const docRef = doc(firestoreAccountCenter, pathCollection, pathDocument)

    await setDoc(docRef, data)
    return { ok: true, message: true }
  } catch (err) {
    return { ok: false, message: err }
  }
}

export async function getFromFirestore(path) {
  const pathCollection = path.split('/')[0]
  const pathDocument = path.split('/')[1]

  const docRef = doc(firestoreAccountCenter, pathCollection, pathDocument)
  const docSnap = await getDoc(docRef)

  if (docSnap.exists()) return docSnap.data()
  else return 'notfound'
}
