import { useRef } from 'react'
import { ToastContainer, toast } from 'react-toastify'

import Button from '../../components/Button/Button'
import Avatar from '../../components/Avatar/Avatar'
import MenuTop from '../../components/Menu/MenuTop/MenuTop'

import { toastData } from '../../js/utils/toast'
import { useGetAccount, useGetAccountProfilePic } from '../../hooks/useAccounts'
import { loadFromLocalStorage } from '../../js/db/local/localStorage'

import './Profile.css'
import 'react-toastify/dist/ReactToastify.css'

export default function Profile() {
  const curId = useRef(
    loadFromLocalStorage('aj-accounts').accounts.active
  ).current
  const accountId = useRef(window.location.pathname.split('/')[2]).current
  const [accountData] = useGetAccount(accountId)
  const [accountProfilePic] = useGetAccountProfilePic(accountId)

  return (
    <>
      <ToastContainer
        position={toastData.position}
        autoClose={toastData.autoClose}
        theme={toastData.theme}
        draggable
      />
      <div className="list_y_small">
        <MenuTop />
        <div className="list_y d_f_ce profile_info_con">
          <Avatar img={accountProfilePic} letter={accountData?.user.fname[0]} />
          <div className="con_bg_df list_y_small w_100">
            <ProfileInfoItem
              data={`${accountData?.user.fname || 'Loading'} ${
                accountData?.user?.lname || ''
              }`}
              icon="account_circle"
              subtitle="Name"
            />
            <ProfileInfoItem
              data={
                accountData?.user?.username
                  ? `@${accountData?.user?.username}`
                  : 'Loading'
              }
              icon="alternate_email"
              subtitle="Username"
            />
            <ProfileInfoItem data={accountId} icon="id_card" subtitle="Id" />
          </div>
        </div>
      </div>
    </>
  )
}

function ProfileInfoItem({ data, icon, subtitle }) {
  function copy() {
    navigator.clipboard.writeText(data)
    toast.success('Copied to clipboard')
  }

  return (
    <>
      <div className="con_bg_dr list_x d_f_ai_ce d_f_jc_sb">
        <div className="list_x d_f_ai_ce">
          <span className="material-symbols-outlined">{icon}</span>
          <div className="list_y_small_very">
            <b>{data.trim()}</b>
            <div className="profile_info_subtitle">{subtitle}</div>
          </div>
        </div>
        {subtitle === 'Id' && (
          <Button className="d_f_ce" onClick={copy}>
            <span className="material-symbols-outlined">content_copy</span>
          </Button>
        )}
      </div>
    </>
  )
}
