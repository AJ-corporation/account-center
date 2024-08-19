import { useGetAccountProfilePic } from '../../hooks/useAccounts'

import './Avatar.css'

export default function Avatar({
  id,
  img,
  letter,
  style = { size: 100, fontSize: 20 },
  editing,
  className,
  ...props
}) {
  const [accountImg] = useGetAccountProfilePic(id)

  return (
    <>
      <div
        className={`avatar d_f_ce ${className}`}
        style={{
          '--avatar-scale-size': `${style.size}px`,
          '--avatar-font-size': style.fontSize
            ? `${style.fontSize}px`
            : 'initial',
        }}
        {...props}
      >
        {editing && '+'}
        {letter && letter}
        {(img || accountImg) && <img src={img || accountImg} alt="Avatar" />}
      </div>
    </>
  )
}
