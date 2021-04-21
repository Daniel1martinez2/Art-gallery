
const authModal = document.createElement('div'); 
authModal.classList.add('modal-bg'); 
authModal.innerHTML = ` <div class="modal ">
<button class="modal__close-btn"> <img src="./lib/svg/close-gray.svg" alt=""> </button>
<form class="modal__form">
  <!-- name -->
  <div class="modal__data register-elem">
    <label for="name">Name</label>
    <input class="modal__input" id="name" type="text" name="name">
  </div>
  <!-- email -->
  <div class="modal__data">
    <label for="name">Email</label>
    <input class="modal__input" id="email" type="email" name="email">
  </div>
  <!-- password -->
  <div class="modal__data">
    <label for="password">Password</label>
    <input class="modal__input" id="password" type="password" name="password">
  </div>
  <!-- confirm -->
  <div class="modal__data  register-elem">
    <label for="confirm">Confirm Password</label>
    <input class="modal__input" id="confirm" type="password" name="confirm">
  </div>
  <!-- btn -->
  <div class="modal__buttons">
    <button class="modal__btn modal__btn--active modal__login">Login</button>
    <button class="modal__btn modal__register">Register</button>
  </div>
</form>
</div>`; 
document.body.appendChild(authModal)
const closeModalBtn = authModal.querySelector('.modal__close-btn'); 
const loginModalBtn = authModal.querySelector('.modal__login'); 
const registerModalBtn = authModal.querySelector('.modal__register'); 
const modalBtnContainer = authModal.querySelector('.modal__buttons'); 
const registerFields = document.querySelectorAll('.register-elem');  
const form = authModal.querySelector('.modal__form'); 
const hiddenRegister = () => {
  registerFields.forEach((elem)=>elem.classList.add('hidden')); 
}
hiddenRegister(); 
closeModalBtn.addEventListener('click',()=> authModal.classList.remove('modal-active')); 
loginModalBtn.addEventListener('click', (event)=>{
  event.preventDefault(); 
  hiddenRegister(); 
  if(loginModalBtn.classList.contains('modal__btn--active')) console.log({
    email: form.email.value
  });
  modalBtnContainer.style.flexDirection = 'column'; 
  loginModalBtn.classList.add('modal__btn--active');
  registerModalBtn.classList.remove('modal__btn--active'); 
}); 
registerModalBtn.addEventListener('click', (event)=>{
  if(registerModalBtn.classList.contains('modal__btn--active')) console.log('register info');
  event.preventDefault(); 
  registerFields.forEach((elem)=>elem.classList.remove('hidden')); 
  modalBtnContainer.style.flexDirection = 'column-reverse'; 
  loginModalBtn.classList.remove('modal__btn--active'); 
  registerModalBtn.classList.add('modal__btn--active'); 
}); 