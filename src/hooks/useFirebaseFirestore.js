import { useEffect, useState } from 'react'
import { getFromFirestore } from '../database/firebase.firestore'

export function useGetFromFirestore(path) {
  const [data, setData] = useState(undefined)
  const pathDocument = path.split('/')[1]

  useEffect(() => {
    if (pathDocument === 'undefined') return
    async function loadData() {
      const res = await getFromFirestore(path)
      setData(res)
    }
    loadData()
  }, [pathDocument])

  return [data, setData]
}
