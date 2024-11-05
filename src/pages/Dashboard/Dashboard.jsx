import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../../components/Button/Button'
import { logoutUser } from '../../database/auth/firebase.auth'
import { useGetCurrentUserFromFirestore } from '../../hooks/userAuth'
import { msTo } from '../../utils/js/converter/convert.time'
import './Dashboard.css'

export default function Dashboard() {
  const [userData] = useGetCurrentUserFromFirestore()
  const navigate = useNavigate()

  useEffect(() => {
    if (userData === 'notfound') navigate('/account/login')
  }, [userData])

  async function logout() {
    await logoutUser()
    navigate('/account/login')
  }

  return (
    <>
      <div className="dashboard_area">
        <div className="dashboard_con list_y">
          <b className="dashboard_user_name">
            Name: {userData?.user?.name || 'Loading'}
          </b>
          <span>Email: {userData?.user?.email || 'Loading'}</span>
          <span>
            Joined: {userData?.joined ? msTo(userData?.joined) : 'Loading'}
          </span>
          <span className="dashboard_user_username">
            Username:{' '}
            {userData?.user?.username
              ? `@${userData?.user?.username}`
              : 'Loading'}
          </span>
          <Button
            className="dashboard_logout_btn"
            disabled={!userData || userData === 'loading'}
            onClick={logout}
          >
            Logout
          </Button>
        </div>
      </div>
    </>
  )
}
