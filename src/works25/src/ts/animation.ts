export const textAnimation = () => {
  // text animation
  const elements = document.querySelectorAll<HTMLElement>(".text__wrapper p");
  if (!elements) return;
  elements.forEach((element) => {
    const { width } = element.getBoundingClientRect();
    element?.style.setProperty("--text-width", `${String(width)}px`);
  })
};