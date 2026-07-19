// Center-crops and scales an image file down to a square JPEG blob (used for avatars).
export function resizeImageToSquare(file: File, size = 500): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    const reader = new FileReader()

    reader.onload = () => {
      img.src = reader.result as string
    }
    reader.onerror = () => reject(new Error('Failed to read file'))

    img.onload = () => {
      const canvas = document.createElement('canvas')
      canvas.width = size
      canvas.height = size

      const ctx = canvas.getContext('2d')
      if (!ctx) {
        reject(new Error('Canvas not supported'))
        return
      }

      // Center-crop the source image to a square before scaling
      const minSide = Math.min(img.width, img.height)
      const sx = (img.width - minSide) / 2
      const sy = (img.height - minSide) / 2

      ctx.drawImage(img, sx, sy, minSide, minSide, 0, 0, size, size)

      canvas.toBlob(
        (blob) => {
          if (blob) {
            resolve(blob)
          } else {
            reject(new Error('Failed to create image blob'))
          }
        },
        'image/jpeg',
        0.9
      )
    }

    img.onerror = () => reject(new Error('Failed to load image'))

    reader.readAsDataURL(file)
  })
}
