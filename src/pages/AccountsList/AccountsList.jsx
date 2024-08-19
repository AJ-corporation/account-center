import { useRef } from 'react'

import { AccountData } from './components/AccountData'
import Button from '../../components/Button/Button'

import { goToHref } from '../../js/utils/href'
import { loadFromLocalStorage } from '../../js/db/local/localStorage'

import './AccountsList.css'

export default function AccountsList() {
  const localData = useRef(loadFromLocalStorage('aj-accounts').accounts).current

  return (
    <>
      <div className="full_page d_f_ce">
        <div className="account_list_con list_y_small">
          <div className="list_y_small">
            <AccountData
              className="accounts_list_active"
              id={localData?.active}
              logout={true}
            />
            <Button className="clr_bd_btn w_100" onClick={() => goToHref('/')}>
              Main page
            </Button>
          </div>
          <hr className="w_100" />
          {localData?.accounts &&
            localData?.accounts.map(
              (id) =>
                id !== localData?.active && <AccountData key={id} id={id} />
            )}
        </div>
      </div>
    </>
  )
}
