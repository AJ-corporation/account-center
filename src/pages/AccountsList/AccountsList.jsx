import { useRef, useState } from 'react'

import Button from '../../components/Button/Button'
import AccountsListAlert from './components/AccountsListAlert'
import AccountsListNoAccount from './components/AccountsListNoAccount'
import { AccountsListDataItem } from './components/AccountsListDataItem'

import { goToHref } from '../../js/utils/href'
import { loadFromLocalStorage } from '../../js/db/local/localStorage'
import { AccountsListContext } from './AccountsListContext'

import './AccountsList.css'

export default function AccountsList() {
  const localData = useRef(loadFromLocalStorage('aj-accounts').accounts).current
  const [status, setStatus] = useState('')

  if (localData?.accounts.length === 0) return <AccountsListNoAccount />

  return (
    <>
      <AccountsListContext.Provider value={{ status, setStatus }}>
        <div className="full_page d_f_ce">
          <div className="account_list_con list_y_small">
            <div className="list_y_small">
              <AccountsListDataItem
                className="accounts_list_active"
                id={localData?.active}
                logout={true}
              />
              {localData?.accounts.length === 1 && <hr className="w_100" />}
              <Button
                className="w_100"
                onClick={() => goToHref('/accounts/login')}
              >
                Add account
              </Button>
              <Button
                className="clr_bd_btn w_100"
                onClick={() => goToHref('/')}
              >
                Main page
              </Button>
            </div>
            {localData?.accounts.length > 1 && <hr className="w_100" />}
            {localData?.accounts &&
              localData?.accounts.map(
                (id) =>
                  id !== localData?.active && (
                    <AccountsListDataItem key={id} id={id} />
                  )
              )}
          </div>
        </div>
        {(status === 'logout' || status === 'switch') && <AccountsListAlert />}
      </AccountsListContext.Provider>
    </>
  )
}
