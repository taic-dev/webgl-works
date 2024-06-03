import gsap from "gsap";
import { EASING } from "./constants";
import { clientRectCoordinate } from "./utils";

const windowWidth = window.innerWidth;
const windowHeight = window.innerHeight;
const listWrapper = document.querySelector(".list");
const listWidth = listWrapper?.clientWidth;
const listHeight = listWrapper?.clientHeight;
const items = document.querySelectorAll(".item");
const rect = items[0].getBoundingClientRect();
let { x, y } = clientRectCoordinate(rect);
const topCoordinate = y;
const bottomCoordinate = -y;
const leftCoordinate = x;
const rightCoordinate = -x;

let scrollNum = 0;

console.log(topCoordinate, bottomCoordinate);
console.log(leftCoordinate, rightCoordinate);

// const ticker = () => {
window.addEventListener("wheel", (e: MouseEvent) => {
  scrollNum += e.deltaY;

  items.forEach((item, i) => {
    const rect = item.getBoundingClientRect();
    let { x, y } = clientRectCoordinate(rect);

    // scroll up
    if (e.wheelDelta < 0) {
      gsap.to(item, {
        y: scrollNum,
        duration: 1,
        // ease: EASING.transform
      });
    }

    // scroll down
    if (e.wheelDelta > 0) {
      gsap.to(item, {
        y: scrollNum,
        duration: 1,
        // ease: EASING.transform
      });
    }

    // if(y <= 0.0) {
    //     scrollNum = 0
    //     item.style.setProperty("transform", `translateY(${listHeight}px)`);
    //   }

    console.log(`[${i}]`, x, y);

    if(y >= windowHeight) {
      scrollNum = 0
      item.style.setProperty("transform", `translateY(${topCoordinate}px)`);
    }
  });
});
// }

// requestAnimationFrame(ticker)
