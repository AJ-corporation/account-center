import { useRef, useState } from 'react'

import Avatar from './Avatar'
import Button from '../Button/Button'

import { imageCompressor } from '../../js/utils/image'

import './Avatar.css'

export default function AvatarEdit({ formData, setFormData }) {
  const inputRef = useRef()
  const [imgs, setImgs] = useState({ file: '', img: '' })

  async function upload(e) {
    const file = e.target.files[0]
    const newImgs = {
      file: await imageCompressor(file),
      img: URL.createObjectURL(file),
    }

    setImgs(newImgs)
    setFormData((prev) => ({ ...prev, img: newImgs }))

    e.target.value = ''
  }

  return (
    <>
      <div className="avatar_edit_con list_y d_f_ai_ce">
        <Avatar
          img={imgs.img || formData?.img?.img}
          editing={true}
          style={{ size: 100, fontSize: 50 }}
          onClick={() => inputRef.current.click()}
        />
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="d_n"
          onChange={upload}
        />
        <Button className="w_100" onClick={() => inputRef.current.click()}>
          Upload
        </Button>
        {(imgs.img || formData?.img?.img) && (
          <Button
            className="w_100 red_bd_btn avatar_delete_btn"
            onClick={() => {
              setFormData((prev) => ({ ...prev, img: '' }))
              setImgs({ file: '', img: '' })
            }}
          >
            Delete
          </Button>
        )}
      </div>
    </>
  )
}
