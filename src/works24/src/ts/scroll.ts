import gsap from "gsap";
import { EASING } from "./constants";
import { clientRectCoordinate } from "./utils";

const windowWidth = window.innerWidth;
const windowHeight = window.innerHeight;
const listWrapper = document.querySelector(".list");
const listWidth = listWrapper?.clientWidth;
const listHeight = listWrapper?.clientHeight;

const items = [...document.querySelectorAll(".item")];
const rect = items[0].getBoundingClientRect();
const { width } = rect;
let { x, y } = clientRectCoordinate(rect);
const topCoordinate = y;
const bottomCoordinate = -y;
const leftCoordinate = x;
const rightCoordinate = -x;

console.log(topCoordinate)

let scrollNumArray = []
let initCoordinate = []
items.forEach((item) => {
  scrollNumArray.push(0);
  const rect = item.getBoundingClientRect();
  initCoordinate.push(clientRectCoordinate(rect))
});

console.log(initCoordinate)

let scrollNum = 0;

console.log(topCoordinate, bottomCoordinate);
console.log(leftCoordinate, rightCoordinate);

// const ticker = () => {
window.addEventListener("wheel", (e: MouseEvent) => {
  // scrollNum -= e.deltaY;

  items.forEach((item, i) => {
    const rect = item.getBoundingClientRect();
    let { x, y } = clientRectCoordinate(rect);

    item.style.display = 'block';

    scrollNumArray[i] -= e.deltaY;

    // scroll up (minus)
    if (e.wheelDelta < 0) {
      gsap.to(item, {
        y: scrollNumArray[i],
        duration: 1,
        // ease: EASING.transform
      });
    } 

    console.log(y)

    if(y > topCoordinate) {
      console.log("action:",topCoordinate)
      item.style.display = 'none';
      item.style.transform = `translate(0, ${listHeight - width - 45}px)`

      scrollNumArray[i] = listHeight
      // item.style.setProperty("transform", `translate(0, ${topCoordinate}px)`);
    }

    // scroll down
    if (e.wheelDelta > 0) {
      gsap.to(item, {
        y: scrollNumArray[i],
        duration: 1,
        // ease: EASING.transform
      });
    }

    // console.log(`[${i}]`, x, y);
  });

  console.log(scrollNumArray)
});
// }

// requestAnimationFrame(ticker)
