import { useRef } from 'react'

import { AccountDataMedium } from './components/AccountData'

import { loadFromLocalStorage } from '../../js/db/local/localStorage'

import './AccountsList.css'

export default function AccountsList() {
  const localData = useRef(loadFromLocalStorage('aj-accounts').accounts).current

  return (
    <>
      <div className="full_page d_f_ce list_y_small">
        <AccountDataMedium
          className="accounts_list_active"
          id={localData?.active}
        />
        <hr className="w_100" />
        {localData?.accounts &&
          localData?.accounts.map(
            (id) =>
              id !== localData?.active && <AccountDataMedium key={id} id={id} />
          )}
      </div>
    </>
  )
}
