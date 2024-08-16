import { useEffect, useState } from 'react'
import { loadFromFirestore } from '../js/db/firebase/firebaseFirestore'
import { downloadFromStore } from '../js/db/firebase/firebaseStorage'

export function useGetAccount(id) {
  const [data, setData] = useState()
  useEffect(() => {
    async function loadData() {
      const accountData = await loadFromFirestore('accounts', `${id}`)
      setData(accountData)
    }
    loadData()
  }, [id])

  return [data, setData]
}

export function useGetAccountProfilePic(id) {
  const [data, setData] = useState()
  useEffect(() => {
    async function loadData() {
      const accountData = await downloadFromStore(`users/${id}`)
      setData(accountData)
    }
    loadData()
  }, [id])

  return [data, setData]
}
