import AccountListCreateOrLogin from './AccountListCreateOrLogin'

export default function AccountsListNoAccount() {
  return (
    <>
      <div className="full_page d_f_ce list_y">
        <div className="list_y_small d_f_ce">
          <span className="material-symbols-outlined accounts_list_no_account_icon txt_red">
            warning
          </span>
          <b>You do not have account yet please create one or login</b>
        </div>
        <AccountListCreateOrLogin />
      </div>
    </>
  )
}
