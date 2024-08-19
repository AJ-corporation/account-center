import { useContext } from 'react'

import Alert from '../../../components/Alert/Alert'

import { AccountsListContext } from '../AccountsListContext'

export default function AccountsListAlert() {
  const { status } = useContext(AccountsListContext)

  return (
    <>
      <Alert>
        <div className="d_f_ce">
          {status === 'logout'
            ? 'Wait we are logging you out'
            : 'Wait we are switching your account'}
        </div>
      </Alert>
    </>
  )
}
