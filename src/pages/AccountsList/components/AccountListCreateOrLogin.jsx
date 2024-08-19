import Button from '../../../components/Button/Button'

import { goToHref } from '../../../js/utils/href'

export default function AccountListCreateOrLogin() {
  return (
    <div className="list_x d_f_ai_ce">
      <Button
        className="clr_bd_btn"
        onClick={() => goToHref('/accounts/signup')}
      >
        Create
      </Button>
      <div>or</div>
      <Button onClick={() => goToHref('/accounts/login')}>Login</Button>
    </div>
  )
}
