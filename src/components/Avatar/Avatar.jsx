import './Avatar.css'

export default function Avatar({ img, style, editing, ...props }) {
  return (
    <>
      <div
        className="avatar d_f_ce"
        style={{
          '--avatar-scale-size': `${style.size}px`,
          '--avatar-font-size': style.fontSize
            ? `${style.fontSize}px`
            : 'initial',
        }}
        {...props}
      >
        {editing && '+'}
        {img && <img src={img} alt="Avatar" />}
      </div>
    </>
  )
}
