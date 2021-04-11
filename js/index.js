const circleBig = document.querySelector('.hero__text-wrapper');
const circleArt = circleBig.querySelectorAll('h1');
//-----------gallery paints vars
const paints = document.querySelectorAll('.gallery__paint');

//carousel vars
const paintsMain = document.querySelector('.main__paints');
const arrowLeft = document.querySelector('.main__arrow-left');
const arrowRight = document.querySelector('.main__arrow-right');
const carousel = document.querySelector('.main__carousel');
const bullets = document.querySelectorAll('.main__bullet');
const bulletsArray = Array.from(bullets);
carousel.style.transition = 'all .5s ease-in-out';
let paintCounter = 0;
//nodelist
const paintsInside = document.querySelectorAll('.main__paint-cover');
//array from this paints
const paintsArray = Array.from(paintsInside);
const paintsMainSize = {
  height: paintsMain.clientHeight,
  width: paintsMain.clientWidth
};
paintsInside.forEach((obj, i) => {
  obj.style.width = `${paintsMainSize.width}px`;
});

arrowRight.addEventListener('click', () => {
  if (paintCounter < 3) {
    paintCounter++;
    carousel.style.transform = `translateX(${-paintsMainSize.width*paintCounter}px)`;
  } else {
    carousel.style.transform = `translateX(${0}px)`;
    paintCounter = 0;
  }
  setBulletActive(paintCounter);
});
arrowLeft.addEventListener('click', () => {
  if (paintCounter > 0) {
    paintCounter--;
    carousel.style.transform = `translateX(${-paintsMainSize.width*paintCounter}px)`;
  } else {
    carousel.style.transform = `translateX(${-paintsMainSize.width*3}px)`;
    paintCounter = 3;
  }
  setBulletActive(paintCounter);
});

let setBulletActive = (value) => {
  bulletsArray.forEach((obj, i) => {
    obj.classList.remove('main__bullet--active');
  });
  bulletsArray[value].classList.add('main__bullet--active');
}


paints.forEach((p, i) => {
  new hoverEffect({
    parent: p,
    intensity: 0.5,
    image1: `./lib/img/pain-img/a${i+1}.png`,
    image2: `./lib/img/pain-img/a${i+1}.png`,
    displacementImage: './lib/img/heightMap.png'

  });
});




circleArt.forEach((elem, i) => {
  elem.style.top = `${80*i}px`;
});


//lottie animation
const play = document.querySelector(".hero__form-button");

const svgContainer = document.querySelector(".hero__svg");
const animItem = bodymovin.loadAnimation({
  wrapper: svgContainer,
  animType: "svg",
  loop: false,
  autoplay: false,
  path: "./lib/animations/anima.json",
});
play.addEventListener("click", () => {
  svgContainer.classList.remove("hero__svg--hide");
  animItem.goToAndPlay(0, true);

});

animItem.addEventListener("complete", () => {
  svgContainer.classList.add("hero__svg--hide");
});