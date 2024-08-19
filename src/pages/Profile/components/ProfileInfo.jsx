import { ToastContainer, toast } from 'react-toastify'

import Button from '../../../components/Button/Button'

import { toastData } from '../../../js/utils/toast'

import 'react-toastify/dist/ReactToastify.css'

export default function ProfileInto({ accountData, accountId }) {
  return (
    <>
      <ToastContainer
        position={toastData.position}
        autoClose={toastData.autoClose}
        theme={toastData.theme}
        draggable
      />
      <div className="list_y_small">
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
          <Button className="d_f_ce pd_small_very" onClick={copy}>
            <span className="material-symbols-outlined fz_small_icon">
              content_copy
            </span>
          </Button>
        )}
      </div>
    </>
  )
}
