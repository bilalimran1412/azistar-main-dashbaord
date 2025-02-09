export const createImage = (url) =>
  new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener('load', () => resolve(image));
    image.addEventListener('error', (error) => reject(error));
    image.setAttribute('crossOrigin', 'anonymous');
    image.src = url;
  });

export default async function getCroppedImg(imageSrc, pixelCrop) {
  const image = await createImage(imageSrc);
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  if (!ctx || !pixelCrop) {
    return null;
  }

  const { width: bBoxWidth, height: bBoxHeight } = image;

  canvas.width = bBoxWidth;
  canvas.height = bBoxHeight;

  ctx.translate(bBoxWidth / 2, bBoxHeight / 2);
  ctx.scale(1, 1);
  ctx.translate(-image.width / 2, -image.height / 2);

  ctx.drawImage(image, 0, 0);

  const croppedCanvas = document.createElement('canvas');

  const croppedCtx = croppedCanvas.getContext('2d');

  if (!croppedCtx) {
    return null;
  }

  croppedCanvas.width = pixelCrop.width;
  croppedCanvas.height = pixelCrop.height;

  croppedCtx.drawImage(
    canvas,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    pixelCrop.width,
    pixelCrop.height
  );
  const blob = await new Promise((resolve, reject) => {
    croppedCanvas.toBlob((blob) => {
      if (!blob) reject('Failed to create Blob');
      else resolve(blob);
    }, 'image/jpeg');
  });

  if (!blob) return null;
  const fileName = 'image.jpg';
  const croppedImageFile = new File([blob], fileName, { type: 'image/jpeg' });
  const croppedImageSrcURL = URL.createObjectURL(blob);
  return { croppedImageFile, croppedImageSrcURL };
}

export function fileToBlobURL(file) {
  return URL.createObjectURL(file);
}
