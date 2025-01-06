import { clientRectCoordinate } from "./utils";
import { Webgl } from "./webgl";

const ROW = 4
const COLUMN = 5
const GAP = 50
const items = [...document.querySelectorAll<HTMLElement>(".image-item")];
const itemWidth = items[0].clientWidth;
const itemHeight = items[0].clientHeight;
const clientRectCoordinateArray: { x: number; y: number }[] = [];
const scrollArray: { x: number; y: number }[] = [];
const nextPosition: { x: number; y: number }[] = [];

// webgl
const webgl = new Webgl();
webgl.init();

items.forEach((item) => {
  const rect = item.getBoundingClientRect();
  const { x, y } = clientRectCoordinate(rect);
  clientRectCoordinateArray.push({ x, y });
  scrollArray.push({ x: 0, y: 0 });
  nextPosition.push({ x: 0, y: 0 });
});

window.addEventListener("wheel", (e: WheelEvent) => {
  e.preventDefault();

  const X = Math.abs(e.deltaX * 0.7) === 0.7 ? 0 : e.deltaX * 0.7
  const Y = Math.abs(e.deltaY * 0.7) === 0.7 ? 0 : e.deltaY * 0.7

  webgl._scrollAnimation(X, Y);

  items.forEach((item, i) => {
    const rect = item.getBoundingClientRect();
    const { x, y } = clientRectCoordinate(rect);

    scrollArray[i].x -= X;
    scrollArray[i].y -= Y;

    // slide up
    if (y > clientRectCoordinateArray[0].y + clientRectCoordinateArray[0].y / 4) {
      item.style.transform = `translate(0, ${itemHeight * COLUMN + GAP * COLUMN + scrollArray[i].y}px)`;
      scrollArray[i].y = itemHeight * COLUMN + GAP * COLUMN + scrollArray[i].y;
    }

    // slide down
    if (y < clientRectCoordinateArray[items.length - 1].y + clientRectCoordinateArray[items.length - 1].y / 4) {
      item.style.transform = `translate(0, -${itemHeight * COLUMN - GAP * COLUMN + scrollArray[i].y}px)`;
      scrollArray[i].y = -itemHeight * COLUMN - GAP * COLUMN + scrollArray[i].y;
    }

    // slide left
    if (x < clientRectCoordinateArray[0].x + clientRectCoordinateArray[0].x / 4) {
      item.style.transform = `translate(${itemWidth * ROW + GAP * ROW + scrollArray[i].x}px, 0)`;
      scrollArray[i].x = itemWidth * ROW + GAP * ROW + scrollArray[i].x;
    }

    // slide right
    if (x > clientRectCoordinateArray[items.length - 1].x + clientRectCoordinateArray[items.length - 1].x / 4) {
      item.style.transform = `translate(-${itemWidth * ROW - GAP * ROW + scrollArray[i].x}px, 0)`;
      scrollArray[i].x = -itemWidth * ROW - GAP * ROW + scrollArray[i].x;
    }

    item.style.transform = `translate(${scrollArray[i].x}px, ${scrollArray[i].y}px)`;
  });
}, { passive: false});
