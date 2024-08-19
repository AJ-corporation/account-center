import Alert from '../../../components/Alert/Alert'
import Button from '../../../components/Button/Button'

import { goToHref } from '../../../js/utils/href'

export function ProfileMenuAlert({ setShowAlert }) {
  return (
    <>
      <Alert onHide={() => setShowAlert((prev) => ({ ...prev, menu: false }))}>
        <div className="list_y_small">
          <Button
            className="dark_btn"
            onClick={() => goToHref('/accounts/switch')}
          >
            <span>Account center</span>
          </Button>
          <Button
            className="dark_btn"
            onClick={() => {
              setShowAlert((prev) => ({ ...prev, menu: false, logout: true }))
            }}
          >
            <span className="txt_red">Log out</span>
          </Button>
        </div>
      </Alert>
    </>
  )
}

export function ProfileLogoutAlert({ setShowAlert }) {
  return (
    <>
      <Alert
        onHide={() => setShowAlert((prev) => ({ ...prev, logout: false }))}
      >
        <div className="list_y_small">
          <p>Are you sure you want to log out?</p>
          <Button className="dark_btn">
            <span className="txt_red">Log out</span>
          </Button>
        </div>
      </Alert>
    </>
  )
}
