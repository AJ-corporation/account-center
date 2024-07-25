export function trimStrings(obj) {
  if (typeof obj === 'string') {
    return obj.trim()
  } else if (typeof obj === 'object' && obj !== null) {
    for (let key in obj) {
      obj[key] = trimStrings(obj[key])
    }
  }
  return obj
}
