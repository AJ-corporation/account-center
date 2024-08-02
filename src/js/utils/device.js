export function isDevicePhone() {
  const userAgent = navigator.userAgent || navigator.vendor || window.opera

  return /android|iphone|ipad|ipod|blackberry|iemobile|opera mini|mobile|silk/i.test(
    userAgent
  )
}
