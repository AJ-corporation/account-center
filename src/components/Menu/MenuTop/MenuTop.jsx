import Avatar from '../../Avatar/Avatar'
import Button from '../../Button/Button'

import './MenuTop.css'

export default function MenuTop() {
  return (
    <>
      <div className="pd_small d_f_ce">
        <div className="con_bg_df list_x d_f_ai_ce">
          <Button className="d_f_ce pd_small">
            <span className="material-symbols-outlined">search</span>
          </Button>
          <Avatar
            className="menu_top_avatar cur_poi"
            style={{ size: 36 }}
            letter="a"
          />
        </div>
      </div>
    </>
  )
}
