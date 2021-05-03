
const setTransition = (elem, locationLink) => {
  elem.addEventListener('click',(event)=>{
      event.preventDefault(); 
      const transitionContainer = document.createElement('div');
      document.body.appendChild(transitionContainer); 
      const transitionDiv1 = document.createElement('div'); 
      const transitionDiv2 = document.createElement('div'); 
      const transitionDiv3 = document.createElement('div'); 
      transitionContainer.appendChild(transitionDiv1); 
      transitionContainer.appendChild(transitionDiv2); 
      transitionContainer.appendChild(transitionDiv3); 
      transitionContainer.classList.add('transition'); 
      transitionDiv1.classList.add('transition__elem'); 
      transitionDiv2.classList.add('transition__elem'); 
      transitionDiv3.classList.add('transition__elem'); 
      gsap.fromTo(transitionDiv2,{x:'100%'},{
          x:'-100%',
          duration: 0.5,
          ease: 'power3.out'
      }); 
      gsap.fromTo(transitionDiv3,{
          x:'100%'
      },{
          x:'-100%', 
          duration: 1,
          delay: 0.07, 
          ease: 'power3.out',
          onComplete: ()=>{
             window.location.href= locationLink; 
          }
      }); 
      gsap.fromTo(transitionDiv1,{
          x:'100%'
      },{
          x:'0',
          duration: .7,
  
      })
  })
}



