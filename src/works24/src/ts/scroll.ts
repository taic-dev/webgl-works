import gsap from "gsap";
import { EASING } from "./constants";
import { clientRectCoordinate } from "./utils";

const items = [...document.querySelectorAll<HTMLElement>(".item")];
const itemHeight = items[0].clientHeight;
const initPosition: number[] = []
let scrollYArray: number[] = []

items.forEach((item, i) => {
  scrollYArray.push(0)
  const rect = item.getBoundingClientRect();
  const { y } = clientRectCoordinate(rect);
  initPosition.push(y);
})

window.addEventListener("wheel", (e: WheelEvent) => {
  items.forEach((item, i) => {
    const rect = item.getBoundingClientRect();
    const { y } = clientRectCoordinate(rect);

    scrollYArray[i] -= e.deltaY;

    // slide up
    if(y > initPosition[0] + initPosition[0] / 4) {

      item.style.transform = `translate(0, ${itemHeight * 5 + 15 * 5 + scrollYArray[i]}px)`;
      scrollYArray[i] = itemHeight * 5 + 15 * 5 + scrollYArray[i]
    }
    
    // slide down
    if(y < initPosition[items.length - 1] + initPosition[items.length - 1] / 4) {

      item.style.transform = `translate(0, -${itemHeight * 5 - 15 * 5 + scrollYArray[i]}px)`;
      scrollYArray[i] = -itemHeight * 5 - 15 * 5 + scrollYArray[i]
    }

    item.style.transform = `translate(0, ${scrollYArray[i]}px)`;

  });
});