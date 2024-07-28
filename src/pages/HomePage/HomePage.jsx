import Button from '../../components/Button/Button'

import { goToHref } from '../../js/utils/href'

import logo from '../../imgs/logo/logo.jpg'

import './HomePage.css'

export default function HomePage() {
  return (
    <>
      <div className="full_page d_f_ce">
        <div className="home_con list_y">
          <img className="home_page_logo" src={logo} alt="Logo" />
          <Button
            className="home_page_btn bd_circle w_100"
            onClick={() => goToHref('/accounts/signup')}
          >
            <span>Create account</span>
          </Button>
        </div>
      </div>
    </>
  )
}
