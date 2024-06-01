import gsap from "gsap";
import CustomEase from "gsap/CustomEase";

gsap.registerPlugin(CustomEase);

export const EASING = {
  transform: CustomEase.create("transform", "M0,0 C0.44,0.05 0.17,1 1,1"),
  colorAndOpacity: CustomEase.create(
    "colorAndOpacity",
    "M0,0 C0.26,0.16 0.1,1 1,1 "
  ),
};

export const ACCESSORY_DATA = [
  {
    TITLE: "Gold Earrings",
    TEXT: "Introducing the 'Double Gold Earrings,' a premium jewelry item that combines sophisticated design with high-quality materials.<br/>These earrings feature a unique double-layer structure with two interlocking circles that shimmer with every movement, reflecting light beautifully and drawing attention from any angle.<br>Crafted from fine 18-karat gold, they offer timeless elegance and durability. The hypoallergenic properties ensure comfort for sensitive skin.<br>Symbolizing eternal bonds and infinite possibilities, these earrings enhance the wearer's allure. They are perfect for both daily wear and special occasions, adding a touch of sophistication to any outfit.<br>Lightweight and comfortable, they are designed for long-term wear without discomfort. The simple fastening mechanism allows for easy and quick wear.<br>The 'Double Gold Earrings' are a perfect blend of design, beauty, and functionality, making them an ideal gift for yourself or a loved one.",
  },
  { TITLE: "", TEXT: "" },
  { TITLE: "", TEXT: "" },
  { TITLE: "", TEXT: "" },
  { TITLE: "", TEXT: "" },
  { TITLE: "", TEXT: "" },
  { TITLE: "", TEXT: "" },
  { TITLE: "", TEXT: "" },
  { TITLE: "", TEXT: "" },
  { TITLE: "", TEXT: "" },
  { TITLE: "", TEXT: "" },
];
