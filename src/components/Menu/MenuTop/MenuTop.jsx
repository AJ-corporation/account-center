import { useRef } from 'react'

import Avatar from '../../Avatar/Avatar'
import Button from '../../Button/Button'
import AccountListCreateOrLogin from '../../../pages/AccountsList/components/AccountListCreateOrLogin'

import { loadFromLocalStorage } from '../../../js/db/local/localStorage'

import './MenuTop.css'

export default function MenuTop() {
  const curId = useRef(
    loadFromLocalStorage('aj-accounts').accounts.active
  ).current

  return (
    <>
      <div className="pd_small d_f_ce">
        <div className="con_bg_df list_x d_f_ai_ce">
          {curId && (
            <>
              <Button className="d_f_ce pd_small">
                <span className="material-symbols-outlined">search</span>
              </Button>
              <a href={`/profile/${curId}`}>
                <Avatar
                  id="10"
                  className="menu_top_avatar cur_poi"
                  style={{ size: 36 }}
                  letter="a"
                />
              </a>
            </>
          )}
          {!curId && <AccountListCreateOrLogin />}
        </div>
      </div>
    </>
  )
}
