const months = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
]

export function msTo(ms) {
  const date = new Date()
  date.setTime(ms)

  return `${months[date.getMonth()]} ${date.getFullYear()}`
}
