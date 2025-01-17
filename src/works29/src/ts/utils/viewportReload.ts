import { BREAK_POINT, PARAMS } from "./constants";

export const viewportReload = () => {
  const width = window.innerWidth;
  const beforeWidth = PARAMS.WINDOW.W;

  if (beforeWidth < BREAK_POINT.MD + 1 && width > BREAK_POINT.MD + 1) {
    window.location.reload();
  }

  if (beforeWidth > BREAK_POINT.MD + 1 && width < BREAK_POINT.MD + 1) {
    window.location.reload();
  }
};