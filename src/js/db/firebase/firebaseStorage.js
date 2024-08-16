import { firebaseStorage } from './firebaseInit'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'

export async function uploadBlob(path, blob) {
  const storageRef = ref(firebaseStorage, path)

  return uploadBytes(storageRef, blob)
    .then(() => true)
    .catch(() => false)
}

export async function downloadFromStore(path) {
  const starsRef = ref(firebaseStorage, path)

  return getDownloadURL(starsRef)
    .then((url) => {
      return url
    })
    .catch(() => {
      return false
    })
}
