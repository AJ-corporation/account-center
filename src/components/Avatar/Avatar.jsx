import './Avatar.css'

export default function Avatar({
  img,
  letter,
  style = { size: 100, fontSize: 20 },
  editing,
  ...props
}) {
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
        {letter && letter}
        {img && <img src={img} alt="Avatar" />}
      </div>
    </>
  )
}
