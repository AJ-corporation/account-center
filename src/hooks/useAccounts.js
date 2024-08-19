import { useEffect, useState } from 'react'
import { loadFromFirestore } from '../js/db/firebase/firebaseFirestore'
import { downloadFromStore } from '../js/db/firebase/firebaseStorage'

const accountsData = {
  users: {},
  profiles: {},
}

export function useGetAccount(id) {
  const [data, setData] = useState()
  useEffect(() => {
    async function loadData() {
      if (accountsData.users.id) setData(accountsData.users.id)
      if (!accountsData.users.id) {
        const accountData = await loadFromFirestore('accounts', `${id}`)
        accountsData.users.id = accountData
        setData(accountData)
      }
    }
    loadData()
  }, [id])

  return [data, setData]
}

export function useGetAccountProfilePic(id) {
  const [data, setData] = useState()
  useEffect(() => {
    async function loadData() {
      if (accountsData.profiles.id) setData(accountsData.profiles.id)
      if (!accountsData.profiles.id) {
        const accountData = await downloadFromStore(`users/${id}/avatar`)
        accountsData.profiles.id = accountData
        setData(accountData)
      }
    }
    loadData()
  }, [id])

  return [data, setData]
}
