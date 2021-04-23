const userAuthChanged = (loggedIn,dataUser) => {
  const userNameText = document.querySelector('.shop-header__user-name'); 
  if(loggedIn && dataUser){
    userNameText.innerText = `Hi ${dataUser?.name.length > 6 ? dataUser?.name.slice(0,6) + '...': dataUser?.name}`; 
    authModal.classList.remove('modal-active');
  }; 
  document.querySelectorAll('.logged').forEach(element => {
    if(loggedIn){
      element.classList.remove('hidden'); 
    }else{
      element.classList.add('hidden'); 
    }
  });
  document.querySelectorAll('.logOut').forEach(element => {
    if(loggedIn){
      element.classList.add('hidden'); 
    }else{
      element.classList.remove('hidden'); 
    }
  })

}