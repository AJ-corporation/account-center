import Button from '../../components/Button/Button'
import logo from '../../imgs/logo/logo.jpg'

import './HomePage.css'

export default function HomePage() {
  return (
    <>
      <div className="full_page d_f_ce">
        <div className="home_con list_y">
          <img className="home_page_logo" src={logo} alt="Logo" />
          <Button className="home_page_btn bd_circle w_100">
            <span>Create account</span>
          </Button>
        </div>
      </div>
    </>
  )
}
