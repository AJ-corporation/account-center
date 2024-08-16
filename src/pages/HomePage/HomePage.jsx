import { useRef } from 'react'

import Button from '../../components/Button/Button'

import { goToHref } from '../../js/utils/href'
import { loadFromLocalStorage } from '../../js/db/local/localStorage'

import logo from '../../imgs/logo/logo.jpg'

import './HomePage.css'

export default function HomePage() {
  const accounts = useRef(loadFromLocalStorage('aj-accounts')).current.accounts
  const hasAccounts = useRef(accounts.accounts?.length > 0).current
  const btnLink = useRef(
    hasAccounts ? `/profile/${accounts.active}` : '/accounts/signup'
  ).current

  return (
    <>
      <div className="full_page d_f_ce">
        <div className="home_con list_y">
          <img className="home_page_logo" src={logo} alt="Logo" />
          <Button
            className="home_page_btn bd_circle w_100"
            onClick={() => goToHref(btnLink)}
          >
            {hasAccounts && <span>Go to account</span>}
            {!hasAccounts && <span>Create account</span>}
          </Button>
        </div>
      </div>
    </>
  )
}
