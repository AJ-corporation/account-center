export async function imageCompressor(
  image,
  maxWidth = 800,
  quality = 0.7,
  format = 'image/jpeg',
  fileName = 'compressed_image.jpg'
) {
  return new Promise((res, rej) => {
    const reader = new FileReader()

    reader.onload = (event) => {
      const img = new Image()
      img.onload = () => {
        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')

        let width = img.width
        let height = img.height

        if (width > maxWidth) {
          height = (height * maxWidth) / width
          width = maxWidth
        }

        canvas.width = width
        canvas.height = height

        ctx.drawImage(img, 0, 0, width, height)

        const dataUrl = canvas.toDataURL(format, quality)

        const byteString = atob(dataUrl.split(',')[1])
        const mimeString = dataUrl.split(',')[0].split(':')[1].split(';')[0]

        const arrayBuffer = new ArrayBuffer(byteString.length)
        const intArray = new Uint8Array(arrayBuffer)

        for (let i = 0; i < byteString.length; i++) {
          intArray[i] = byteString.charCodeAt(i)
        }

        const blob = new Blob([intArray], { type: mimeString })
        const file = new File([blob], image?.name || fileName, {
          type: mimeString,
        })

        res(file)
      }
      img.src = event.target.result
    }

    reader.onerror = (err) => {
      rej(err)
    }

    reader.readAsDataURL(image)
  })
}

export function pasteImage(e) {
  return new Promise((res) => {
    const { items } = e.clipboardData

    for (let i = 0; i < items.length; i++) {
      if (items[i].type.indexOf('image') !== -1) {
        const file = items[i].getAsFile()
        res(file)
      }
    }
    res(false)
  })
}
