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
    <label for="email">Email</label>
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

const userInfo = () => {
  return {
    name: form.name.value,
    email: form.email.value,
    password: form.password.value,
    confirmPassword: form.confirm.value,
  }
};
const clearForm = () => {
  form.name.value = '';
  form.email.value = '';
  form.password.value = '';
  form.confirm.value = '';
}
const hiddenRegister = () => {
  registerFields.forEach((elem) => elem.classList.add('hidden'));
}
hiddenRegister();
closeModalBtn.addEventListener('click', () => authModal.classList.remove('modal-active'));
loginModalBtn.addEventListener('click', (event) => {
  event.preventDefault();
  hiddenRegister();
  if (loginModalBtn.classList.contains('modal__btn--active')) {
    const info = userInfo();
    firebase.auth().signInWithEmailAndPassword(info.email, info.password)
      .then(() => {
        clearForm();
      })
  };
  modalBtnContainer.style.flexDirection = 'column';
  loginModalBtn.classList.add('modal__btn--active');
  registerModalBtn.classList.remove('modal__btn--active');
});
registerModalBtn.addEventListener('click', (event) => {
  event.preventDefault();
  if (registerModalBtn.classList.contains('modal__btn--active') && !loggedUser) {
    const info = userInfo();
    firebase.auth().createUserWithEmailAndPassword(info.email, info.password)
      .then((userCredential) => {
        clearForm();
        let user = userCredential.user;
        console.log(user, '🔥');
        const userDoc = {
          name: info.name,
          email: info.email,
          admin: false
        };
        db.collection('users').doc(user.uid).set(userDoc)
        .then(()=>{
          setLoggedUser(userDoc, user.uid);
        })
      })
      .catch((error) => {
        console.log(error);
      });
  };

  registerFields.forEach((elem) => elem.classList.remove('hidden'));
  modalBtnContainer.style.flexDirection = 'column-reverse';
  loginModalBtn.classList.remove('modal__btn--active');
  registerModalBtn.classList.add('modal__btn--active');
});