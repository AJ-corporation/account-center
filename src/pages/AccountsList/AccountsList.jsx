import { useRef } from 'react'

import { AccountData } from './components/AccountData'

import { loadFromLocalStorage } from '../../js/db/local/localStorage'

import './AccountsList.css'

export default function AccountsList() {
  const localData = useRef(loadFromLocalStorage('aj-accounts').accounts).current

  return (
    <>
      <div className="full_page d_f_ce list_y_small">
        <AccountData className="accounts_list_active" id={localData?.active} />
        <hr className="w_100" />
        {localData?.accounts &&
          localData?.accounts.map(
            (id) => id !== localData?.active && <AccountData key={id} id={id} />
          )}
      </div>
    </>
  )
}
