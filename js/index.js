const circleBig = document.querySelector('.hero__text-wrapper');
const circleArt = circleBig.querySelectorAll('h1');
//-----------gallery paints vars
const paints = document.querySelectorAll('.gallery__paint');

//carousel vars
const paintsMain = document.querySelector('.main__paints');
const arrowLeft = document.querySelector('.main__arrow-left');
const arrowRight = document.querySelector('.main__arrow-right');
const carousel = document.querySelector('.main__carousel');
console.log(carousel);
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
console.log(paintsMainSize);
paintsInside.forEach((obj, i) => {
  obj.style.width = `${paintsMainSize.width}px`;
});
// arrowLeft.addEventListener('click', () => {

// });
console.log(paintCounter);
arrowRight.addEventListener('click', () => {

  if (paintCounter < 3) {
    paintCounter++;
    carousel.style.transform = `translateX(${-paintsMainSize.width*paintCounter}px)`;
  } else {
    carousel.style.transform = `translateX(${0}px)`;
    paintCounter = 0;
  }
  console.log(paintCounter);

});
//---init gallery paints
const paintsBg = [{
    url: 'https://historia-arte.com/_/eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpbSI6WyJcL2FydHdvcmtcL2ltYWdlRmlsZVwvbGVtcGlja2EtcmFmYWVsYS5qcGciLCJyZXNpemUsMTUwMHxmb3JtYXQsd2VicCJdfQ.qVdaodUlGWFDA2wzuH9qeyOIJQGhuWmP0RdEpCraRTI.webp'
  },
  {
    url: 'https://historia-arte.com/_/eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpbSI6WyJcL2FydHdvcmtcL2ltYWdlRmlsZVwvNjAyYjlhOGFhYjlmNC5wbmciLCJyZXNpemUsMTUwMHxmb3JtYXQsd2VicCJdfQ.3nr08Ar5WzvnVivYKy_N7jLXMORBwsht50ylaG2TAAM.webp'
  },
  {
    url: 'https://historia-arte.com/_/eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpbSI6WyJcL2FydHdvcmtcL2ltYWdlRmlsZVwvNWQ2YjkxNWI0ZWIyOS5qcGciLCJyZXNpemUsMTUwMHxmb3JtYXQsd2VicCJdfQ.rkVUvTDARDKTBWr3jXEs2pOEpdFyivb-N4R6qCeEfzo.webp'
  },
  {
    url: 'https://historia-arte.com/_/eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpbSI6WyJcL2FydHdvcmtcL2ltYWdlRmlsZVwvam9obi10aGUtYmFwdGlzdC1jYXJhdmFnZ2lvLWdhbGxlcmlhLW5hemlvbmFsZS1kLWFydGUtYW50aWNhLmpwZyIsInJlc2l6ZSwxNTAwfGZvcm1hdCx3ZWJwIl1/9.mcduPKm8dr8HBaAHmaQ8oTYLP2mSo3KCIv0iRMpLyaA.webp'
  },
  {
    url: 'https://historia-arte.com/_/eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpbSI6WyJcL2FydHdvcmtcL2ltYWdlRmlsZVwvNWM1OWE4MDIwYjA3My5qcGciLCJyZXNpemUsMTUwMHxmb3JtYXQsd2VicCJdfQ.GiDES6ibouLpqQLTmomCxLDmsD2hF_AU1pT2eSG_pEo.webp'
  },
  {
    url: 'https://historia-arte.com/_/eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpbSI6WyJcL2FydHdvcmtcL2ltYWdlRmlsZVwvY2FyYXZhZ2dpb18tX21lZHVzYV8tX2dvb2dsZV9hcnRfcHJvamVjdC5qcGciLCJyZXNpemUsMTUwMHxmb3JtYXQsd2VicCJdfQ.Kzb4HtM34KPKFU52rvc87tq_/mm01GfMHsYcfhpYHBt8.webp'
  },

];
paints.forEach((p, i) => {
  p.style.backgroundImage = `url(${paintsBg[i].url})`;
})

circleArt.forEach((elem, i) => {
  elem.style.top = `${80*i}px`;
});