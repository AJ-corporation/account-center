import Button from '../Button/Button'

import './Alert.css'

export default function Alert({ title, children, isCloseable = true, onHide }) {
  return (
    <>
      <div className="alert_win d_f_ce">
        <div
          className="alert_bg"
          onClick={() => {
            if (isCloseable && onHide) onHide()
          }}
        ></div>
        <div className="alert_con list_y">
          {title && <AlertTitle title={title} />}
          <div>{children}</div>
        </div>
      </div>
    </>
  )
}

function AlertTitle({ title }) {
  return (
    <>
      <div className="list_x d_f_ai_ce d_f_jc_sb">
        <b>{title}</b>
        <Button className="d_f_ce pd_small_very bd_50">
          <span className="material-symbols-outlined fz_small_icon">close</span>
        </Button>
      </div>
      <hr className="dark_line" />
    </>
  )
}
