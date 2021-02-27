const circleBig = document.querySelector('.hero__text-wrapper');
const circleArt = circleBig.querySelectorAll('h1');
//-----------gallery paints
const paints = document.querySelectorAll('.gallery__paint');
console.log(paints);

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