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
        </div>
      </Alert>
    </>
  )
}
