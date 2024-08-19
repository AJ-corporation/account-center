import { useContext, useState } from 'react'

import Alert from '../../../components/Alert/Alert'
import Avatar from '../../../components/Avatar/Avatar'
import Button from '../../../components/Button/Button'

import { useGetAccount } from '../../../hooks/useAccounts'
import { logoutAccount, switchAccount } from '../../../modules/accounts.module'
import { AccountsListContext } from '../AccountsListContext'

import './AccountsListDataItem.css'

export function AccountsListDataItem({ className, id, logout = false }) {
  const [accountData] = useGetAccount(id)
  const { setStatus } = useContext(AccountsListContext)
  const [alerts, setAlerts] = useState({ logout: false })

  async function logoutFromAccount(id) {
    setStatus('logout')

    const loggedout = await logoutAccount(id)
    if (loggedout.ok) window.location.reload()
  }

  async function switchAccountToId(id) {
    setStatus('switch')

    const switched = await switchAccount(id)
    if (switched.ok) window.location.reload()
  }

  return (
    <>
      {logout && (
        <div className={`con_bg_dr d_f_jc_sb ${className}`}>
          <AccountDataItem id={id} accountData={accountData} />
          <Button
            disabled={!accountData}
            onClick={() => setAlerts({ ...alerts, logout: true })}
            className="d_f_ce txt_red pd_small"
          >
            <span className="material-symbols-outlined">logout</span>
          </Button>
        </div>
      )}
      {!logout && (
        <Button
          className="list_x"
          disabled={!accountData}
          onClick={() => switchAccountToId(id)}
        >
          <AccountDataItem id={id} accountData={accountData} logout={true} />
        </Button>
      )}
      {alerts.logout && (
        <LogoutAlert
          id={id}
          setAlerts={setAlerts}
          logoutFromAccount={logoutFromAccount}
        />
      )}
    </>
  )
}

function AccountDataItem({ id, accountData, logout = false }) {
  return (
    <>
      <div className="d_f_jc_sb d_f_ai_ce w_100">
        <div className="list_x_small">
          <Avatar
            style={{ size: 35 }}
            id={id}
            letter={accountData?.user?.fname[0]}
          />
          <div className="list_y_small_very d_f_ai_start">
            <div>
              {`${accountData?.user?.fname || 'Loading'} ${
                accountData?.user?.lname || ''
              }`}
            </div>
            <div className="account_data_username">
              {accountData?.user?.username
                ? `@${accountData?.user.username}`
                : ''}
            </div>
          </div>
        </div>
        {logout && (
          <span className="material-symbols-outlined fz_small_icon">
            change_circle
          </span>
        )}
      </div>
    </>
  )
}

function LogoutAlert({ id, setAlerts, logoutFromAccount }) {
  return (
    <>
      <Alert onHide={() => setAlerts((prev) => ({ ...prev, logout: false }))}>
        <div className="list_y_small">
          <p>Are you sure you want to log out?</p>
          <Button className="dark_btn" onClick={() => logoutFromAccount(id)}>
            <span className="txt_red">Log out</span>
          </Button>
        </div>
      </Alert>
    </>
  )
}
