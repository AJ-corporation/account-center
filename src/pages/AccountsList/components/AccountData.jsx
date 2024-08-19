import Avatar from '../../../components/Avatar/Avatar'
import Button from '../../../components/Button/Button'

import { useGetAccount } from '../../../hooks/useAccounts'

import './AccountData.css'

export function AccountData({ className, id }) {
  const [accountData] = useGetAccount(id)

  return (
    <>
      <div className={`con_bg_df account_data_medium ${className}`}>
        <div className="list_x d_f_jc_sb">
          <div className="list_x">
            <Avatar
              style={{ size: 40 }}
              id={id}
              letter={accountData?.user.fname[0]}
            />
            <div className="list_y_small_very d_f_jc_ce">
              <div>
                {`${accountData?.user.fname || 'Loading'} ${
                  accountData?.user?.lname || ''
                }`}
              </div>
              <div className="account_data_username">
                {accountData?.user.username
                  ? `@${accountData?.user.username}`
                  : ''}
              </div>
              <div></div>
            </div>
          </div>
          <Button className="d_f_ce txt_red pd_small">
            <span className="material-symbols-outlined">logout</span>
          </Button>
        </div>
      </div>
    </>
  )
}
