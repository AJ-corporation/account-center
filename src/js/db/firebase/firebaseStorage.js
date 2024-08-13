import { firebaseStorage } from './firebaseInit'
import { ref, uploadBytes } from 'firebase/storage'

export async function uploadBlob(path, blob) {
  const storageRef = ref(firebaseStorage, path)

  return uploadBytes(storageRef, blob)
    .then(() => true)
    .catch(() => false)
}
