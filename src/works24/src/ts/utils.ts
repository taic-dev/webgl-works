export const lerp = (start: number, end: number, multiplier: number) => {
  return (1 - multiplier) * start + multiplier * end;
};

export const clientRectCoordinate = (rect: DOMRect) => {
  const x = rect.left - window.innerWidth / 2 + rect.width / 2;
  const y = -rect.top + window.innerHeight / 2 - rect.height / 2;

  return { x, y };
};

export const getImageUrl = (element: HTMLElement) => {
  const style = window.getComputedStyle(element);
  return style.backgroundImage.slice(4, -1).replace(/['"]/g, "");
};

export const getImageAspect = (element: HTMLElement) => {
  return new Promise<{ w: number; h: number }>((resolve, reject) => {
    const img = new Image();
    const url = getImageUrl(element);
    img.src = url;

    img.onload = async () => {
      const width = img.width;
      const height = img.height;

      resolve({ w: width, h: height });
    };
  });
};
