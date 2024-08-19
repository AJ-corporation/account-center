import { useRef, useState } from 'react'

import ProfileInto from './components/ProfileInfo'
import {
  ProfileLogoutAlert,
  ProfileMenuAlert,
} from './components/ProfileAlerts'
import Button from '../../components/Button/Button'
import Avatar from '../../components/Avatar/Avatar'
import MenuTop from '../../components/Menu/MenuTop/MenuTop'

import { useGetAccount } from '../../hooks/useAccounts'
import { loadFromLocalStorage } from '../../js/db/local/localStorage'

import './Profile.css'

export default function Profile() {
  const curId = useRef(
    loadFromLocalStorage('aj-accounts').accounts.active
  ).current
  const accountId = useRef(window.location.pathname.split('/')[2]).current
  const isOwnAccount = useRef(curId === +accountId).current
  const [accountData] = useGetAccount(accountId)
  const [alerts, setAlerts] = useState({ menu: false, logout: false })

  return (
    <>
      <div className="list_y_small">
        <MenuTop />
        <div className="list_y d_f_ce profile_info_con">
          <Avatar id={accountId} letter={accountData?.user.fname[0]} />
          <div className="profile_menu_icon">
            <Button
              className="d_f_ce bd_50 pd_small"
              onClick={() => setAlerts({ ...alerts, menu: true })}
            >
              <span className="material-symbols-outlined">menu</span>
            </Button>
          </div>
          {alerts.menu && <ProfileMenuAlert setShowAlert={setAlerts} />}
          {alerts.logout && <ProfileLogoutAlert setShowAlert={setAlerts} />}
          <div className="con_bg_df list_y_small w_100">
            <div className="d_f_jc_sb">
              <div></div>
              <b className="d_f_ce">Profile info</b>
              {!isOwnAccount && <div></div>}
              {isOwnAccount && (
                <Button className="d_f_ce pd_small_very">
                  <span className="material-symbols-outlined fz_small_icon">
                    edit
                  </span>
                </Button>
              )}
            </div>
            <hr />
            <ProfileInto accountData={accountData} accountId={accountId} />
          </div>
        </div>
      </div>
    </>
  )
}
