export function getLocation() {
  return new Promise((res, rej) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (pos) => {
        try {
          const userLocation = {
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude,
          }

          res(userLocation)
        } catch (error) {
          rej(error)
        }
      })
    } else {
      rej(new Error('Geolocation is not supported by this browser'))
    }
  })
}
