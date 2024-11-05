import { useEffect, useState } from 'react'
import { getCurrentUser } from '../database/auth/firebase.auth'
import { useGetFromFirestore } from './useFirebaseFirestore'

export function useGetCurrentUser() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    async function loadData() {
      const curUser = await getCurrentUser().then((res) => res)
      setUser(curUser)
    }
    loadData()
  }, [])

  return [user, setUser]
}

export function useGetCurrentUserFromFirestore() {
  const [user] = useGetCurrentUser()
  const [userData] = useGetFromFirestore(`users/${user?.uid}`)
  const [data, setData] = useState('loading')

  useEffect(() => {
    if (userData) setData(userData)
  }, [user, userData])

if (user === false) return ['notfound']
  if (user === undefined || userData === undefined) return ['loading']
  return [data]
}
