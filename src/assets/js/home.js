const items = document.querySelectorAll('.js-item-video');
items.forEach((item) => {
  item.addEventListener('mouseenter', () => {
    item.play();
  })
  item.addEventListener('mouseleave', () => {
    item.pause();
  })
});