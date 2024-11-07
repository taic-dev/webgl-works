export const clientRectCoordinate = (rect: DOMRect) => {
  const x = rect.left - window.innerWidth / 2 + rect.width / 2;
  const y = -rect.top + window.innerHeight / 2 - rect.height / 2;

  return { x, y };
};

export const mouseCoordinate = (e: MouseEvent) => {
  e.preventDefault();

  const x = (e.clientX / window.innerWidth) * 2 - 1;
  const y = -(e.clientY / window.innerHeight) * 2 + 1;

  return { x, y };
};

// 開始と終了をなめらかに補間する関数
export const lerp = (start: number, end: number, multiplier: number) => {
  return (1 - multiplier) * start + multiplier * end;
};