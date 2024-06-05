import gsap from "gsap";
import { EASING } from "./constants";
import { clientRectCoordinate } from "./utils";

const GAP = 50
const items = [...document.querySelectorAll<HTMLElement>(".item")];
const itemWidth = items[0].clientWidth;
const itemHeight = items[0].clientHeight;
const initPosition: { x: number; y: number }[] = [];
const scrollArray: { x: number; y: number }[] = [];

items.forEach((item, i) => {
  scrollArray.push({ x: 0, y: 0 });
  const rect = item.getBoundingClientRect();
  const { x, y } = clientRectCoordinate(rect);
  initPosition.push({ x, y });
});

window.addEventListener("wheel", (e: WheelEvent) => {
  items.forEach((item, i) => {
    const rect = item.getBoundingClientRect();
    const { x, y } = clientRectCoordinate(rect);

    scrollArray[i].x -= e.deltaX;
    scrollArray[i].y -= e.deltaY;

    // slide up
    if (y > initPosition[0].y + initPosition[0].y / 4) {
      item.style.transform = `translate(0, ${itemHeight * 5 + GAP * 5 + scrollArray[i].y}px)`;
      scrollArray[i].y = itemHeight * 5 + GAP * 5 + scrollArray[i].y;
    }

    // slide down
    if (y < initPosition[items.length - 1].y + initPosition[items.length - 1].y / 4) {
      item.style.transform = `translate(0, -${itemHeight * 5 - GAP * 5 + scrollArray[i].y}px)`;
      scrollArray[i].y = -itemHeight * 5 - GAP * 5 + scrollArray[i].y;
    }

    // slide left
    if (x < initPosition[0].x + initPosition[0].x / 4) {
      item.style.transform = `translate(${itemWidth * 4 + GAP * 4 + scrollArray[i].x}px, 0)`;
      scrollArray[i].x = itemWidth * 4 + GAP * 4 + scrollArray[i].x;
    }

    // slide right
    if (x > initPosition[items.length - 1].x + initPosition[items.length - 1].x / 4) {
      item.style.transform = `translate(-${itemWidth * 4 - GAP * 4 + scrollArray[i].x}px, 0)`;
      scrollArray[i].x = -itemWidth * 4 - GAP * 4 + scrollArray[i].x;
    }

    item.style.transform = `translate(${scrollArray[i].x}px, ${scrollArray[i].y}px)`;
  });
}, { passive: false});
