export const clientRectCoordinate = (rect: DOMRect) => {
  const x = rect.left - window.innerWidth / 2 + rect.width / 2;
  const y = -rect.top + window.innerHeight / 2 - rect.height / 2;

  return { x, y };
};