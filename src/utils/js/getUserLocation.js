export const getUserLocation = () => {
  return new Promise((res, rej) => {
    navigator.geolocation.getCurrentPosition(
      (response) => {
        res({
          latitude: response.coords.latitude,
          longitude: response.coords.longitude,
        })
      },
      (err) => {
        rej(err)
      }
    )
  })
}
