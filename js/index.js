const circleBig = document.querySelector('.hero__text-wrapper');
const circleArt = circleBig.querySelectorAll('h1');
circleArt.forEach((elem, i) => {
  elem.style.top = `${80*i}px`;
});