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
  {
    TITLE: "Gold Accessory Collection",
    TEXT: "The photo showcases a beautiful collection of gold accessories. The striking flower-shaped earrings catch the eye, and next to them, a simple yet elegant bangle is displayed. Additionally, there are three rings with different designs, each exuding its own unique charm. The gold shine of each item is stunning, creating a sophisticated ambiance. These accessories, while simple, possess a strong presence that can enhance any outfit.",
  },
  {
    TITLE: "Elegant Gold Charm Bracelet",
    TEXT: "The photo features an elegant gold charm bracelet adorned with intricate details. The bracelet's chain is crafted with a polished gold finish, giving it a luxurious look. Hanging from the chain are several beautifully designed charms, including delicate discs with ornate patterns and shimmering gemstones. The combination of the gold and the sparkling stones creates a sophisticated and timeless piece of jewelry. This charm bracelet is perfect for adding a touch of elegance to any outfit, making it a versatile accessory for both casual and formal occasions.",
  },
  {
    TITLE: "Delicate Gold Chain Necklace",
    TEXT: "The photo features a delicate gold chain necklace, elegantly draped over a soft, textured fabric. The fine chain is adorned with small, evenly spaced gold beads, adding a subtle touch of elegance to the piece. The minimalist design of the necklace exudes sophistication and versatility, making it a perfect accessory for both everyday wear and special occasions. The gold's gentle shimmer against the light fabric highlights the necklace's exquisite craftsmanship and understated beauty, ensuring it will complement any outfit effortlessly.",
  },
  {
    TITLE: "Red Marble Embedded Ring",
    TEXT: "The image showcases a stunning gold ring featuring an embedded piece of red marble. The rich, deep red hue of the marble contrasts beautifully with the gleaming gold band, creating a striking and elegant accessory. The smooth, polished surface of the marble adds a touch of sophistication, while the natural patterns within the stone provide unique character to each ring. This exquisite piece is perfect for adding a pop of color and a hint of luxury to any outfit, making it a versatile addition to both casual and formal ensembles. The combination of gold and red marble symbolizes timeless elegance and refined taste, ensuring that this ring will be cherished for years to come.",
  },
  {
    TITLE: "Elegant Gold Earrings",
    TEXT: "The image showcases a pair of elegant gold earrings that exude sophistication and timeless beauty. Crafted with precision, these earrings feature a sleek and polished gold finish that catches the light beautifully. Their design is both classic and versatile, making them suitable for a variety of occasions, from everyday wear to special events. The gold's warm, lustrous glow enhances any outfit, adding a touch of luxury and refinement. These earrings are perfect for those who appreciate understated elegance and high-quality craftsmanship, ensuring they remain a cherished accessory in any jewelry collection.",
  },
  {
    TITLE: "Gold Earrings",
    TEXT: "Introducing the 'Double Gold Earrings,' a premium jewelry item that combines sophisticated design with high-quality materials.<br/>These earrings feature a unique double-layer structure with two interlocking circles that shimmer with every movement, reflecting light beautifully and drawing attention from any angle.<br>Crafted from fine 18-karat gold, they offer timeless elegance and durability. The hypoallergenic properties ensure comfort for sensitive skin.<br>Symbolizing eternal bonds and infinite possibilities, these earrings enhance the wearer's allure. They are perfect for both daily wear and special occasions, adding a touch of sophistication to any outfit.<br>Lightweight and comfortable, they are designed for long-term wear without discomfort. The simple fastening mechanism allows for easy and quick wear.<br>The 'Double Gold Earrings' are a perfect blend of design, beauty, and functionality, making them an ideal gift for yourself or a loved one.",
  },
  {
    TITLE: "Gold Accessory Collection",
    TEXT: "The photo showcases a beautiful collection of gold accessories. The striking flower-shaped earrings catch the eye, and next to them, a simple yet elegant bangle is displayed. Additionally, there are three rings with different designs, each exuding its own unique charm. The gold shine of each item is stunning, creating a sophisticated ambiance. These accessories, while simple, possess a strong presence that can enhance any outfit.",
  },
  {
    TITLE: "Elegant Gold Charm Bracelet",
    TEXT: "The photo features an elegant gold charm bracelet adorned with intricate details. The bracelet's chain is crafted with a polished gold finish, giving it a luxurious look. Hanging from the chain are several beautifully designed charms, including delicate discs with ornate patterns and shimmering gemstones. The combination of the gold and the sparkling stones creates a sophisticated and timeless piece of jewelry. This charm bracelet is perfect for adding a touch of elegance to any outfit, making it a versatile accessory for both casual and formal occasions.",
  },
  {
    TITLE: "Delicate Gold Chain Necklace",
    TEXT: "The photo features a delicate gold chain necklace, elegantly draped over a soft, textured fabric. The fine chain is adorned with small, evenly spaced gold beads, adding a subtle touch of elegance to the piece. The minimalist design of the necklace exudes sophistication and versatility, making it a perfect accessory for both everyday wear and special occasions. The gold's gentle shimmer against the light fabric highlights the necklace's exquisite craftsmanship and understated beauty, ensuring it will complement any outfit effortlessly.",
  },
  {
    TITLE: "Red Marble Embedded Ring",
    TEXT: "The image showcases a stunning gold ring featuring an embedded piece of red marble. The rich, deep red hue of the marble contrasts beautifully with the gleaming gold band, creating a striking and elegant accessory. The smooth, polished surface of the marble adds a touch of sophistication, while the natural patterns within the stone provide unique character to each ring. This exquisite piece is perfect for adding a pop of color and a hint of luxury to any outfit, making it a versatile addition to both casual and formal ensembles. The combination of gold and red marble symbolizes timeless elegance and refined taste, ensuring that this ring will be cherished for years to come.",
  },
  {
    TITLE: "Elegant Gold Earrings",
    TEXT: "The image showcases a pair of elegant gold earrings that exude sophistication and timeless beauty. Crafted with precision, these earrings feature a sleek and polished gold finish that catches the light beautifully. Their design is both classic and versatile, making them suitable for a variety of occasions, from everyday wear to special events. The gold's warm, lustrous glow enhances any outfit, adding a touch of luxury and refinement. These earrings are perfect for those who appreciate understated elegance and high-quality craftsmanship, ensuring they remain a cherished accessory in any jewelry collection.",
  },
];
