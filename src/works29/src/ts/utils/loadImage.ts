export const loadImage = (element: HTMLImageElement) => new Promise((resolve, reject) => {
  const image = new Image();
  image.onload = () => resolve(image);
  image.onerror = e => reject(e);
})