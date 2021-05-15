const userAuthChanged = (loggedIn, dataUser) => {
  if(loggedIn && dataUser){
    loginDefault(dataUser); 
    if(dataUser.admin){
      loginAdmin(); 
      console.log('admin');
    }
  }else{
    logOutDefault(); 
  }
}


const loginDefault = (dataUser) => {
  const currentModal = document.querySelector('.modal-bg'); 
  if(currentModal) currentModal.classList.remove('modal-active');
  const userName = document.querySelector('.shop-header__user-name'); 
  if(userName)userName.innerText = `Hi ${dataUser?.name.length > 6 ? dataUser?.name.slice(0,6) + '...': dataUser?.name}`;
  document.querySelectorAll('.logged').forEach(element => {
    element.classList.remove('hidden');
  });
  document.querySelectorAll('.logOut').forEach(element => {
    element.classList.add('hidden');
  });
  document.querySelectorAll('.notAdmin').forEach(element => {
    element.classList.remove('hidden');
  });

}
const loginAdmin = () => {
  document.querySelectorAll('.notAdmin').forEach(element => {
    element.classList.add('hidden');
  });
  document.querySelectorAll('.admin').forEach(element => {
    element.classList.remove('hidden');
  });
  document.querySelectorAll('.product__pay-btn').forEach(elem => {
    elem.innerHTML = `<img src="./lib/svg/bag.svg" alt=""> edit product`;
  });
  const btnMsg = document.querySelector('.btn-msg');
  if(btnMsg) btnMsg.innerText = 'Edit Product'; 
  
}
const logOutDefault = () => {
  document.querySelectorAll('.product__pay-btn').forEach(elem => {
    elem.innerHTML = `<img src="./lib/svg/bag.svg" alt=""> add to cart`
  });
  const btnMsg = document.querySelector('.btn-msg');
  if(btnMsg) btnMsg.innerText = 'Add To Cart'; 

  document.querySelectorAll('.admin').forEach(element => {
    element.classList.add('hidden');
  });
  document.querySelectorAll('.logged').forEach(element => {
    element.classList.add('hidden');
  });
  document.querySelectorAll('.logOut').forEach(element => {
    element.classList.remove('hidden');
  });
}