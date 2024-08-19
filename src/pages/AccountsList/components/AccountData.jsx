import Avatar from '../../../components/Avatar/Avatar'
import Button from '../../../components/Button/Button'

import { useGetAccount } from '../../../hooks/useAccounts'

import './AccountData.css'

export function AccountData({ className, id, logout = false }) {
  const [accountData] = useGetAccount(id)

  return (
    <>
      {logout && (
        <div className={`con_bg_dr d_f_jc_sb ${className}`}>
          <AccountDataItem id={id} accountData={accountData} />
          <Button className="d_f_ce txt_red pd_small">
            <span className="material-symbols-outlined">logout</span>
          </Button>
        </div>
      )}
      {!logout && (
        <Button className="list_x">
          <AccountDataItem id={id} accountData={accountData} />
        </Button>
      )}
    </>
  )
}

function AccountDataItem({ id, accountData }) {
  return (
    <>
      <div className="list_x_small">
        <Avatar
          style={{ size: 35 }}
          id={id}
          letter={accountData?.user.fname[0]}
        />
        <div className="list_y_small_very d_f_ai_start">
          <div>
            {`${accountData?.user.fname || 'Loading'} ${
              accountData?.user?.lname || ''
            }`}
          </div>
          <div className="account_data_username">
            {accountData?.user.username ? `@${accountData?.user.username}` : ''}
          </div>
        </div>
      </div>
    </>
  )
}
