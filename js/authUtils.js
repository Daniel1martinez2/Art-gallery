const userAuthChanged = (loggedIn, dataUser) => {

  // document.querySelectorAll('.product__pay-btn').forEach(elem => {
  //   if (dataUser && dataUser.admin) {
  //     elem.innerHTML = `<img src="./lib/svg/bag.svg" alt=""> edit product`
  //     elem.innerHTML = `<img src="./lib/svg/bag.svg" alt=""> edit product`
  //   }else{
  //     elem.innerHTML = `<img src="./lib/svg/bag.svg" alt=""> add to cart`
  //   }
  // })
  // document.querySelectorAll('.logged').forEach(element => {
  //   if (loggedIn ) {
  //     element.classList.remove('hidden');

  //   } else {
  //     element.classList.add('hidden');
  //   }
  // });
  // //login
  // if (loggedIn && dataUser) {
  //   document.querySelector('.shop-header__user-name').innerText = `Hi ${dataUser?.name.length > 6 ? dataUser?.name.slice(0,6) + '...': dataUser?.name}`;
  //   authModal.classList.remove('modal-active');
  //   //loginAdmin
  //   if (dataUser && dataUser.admin) {
  //     document.querySelector('.shop-header__bag').classList.add('hidden');
  //   }
  // };
  // //logOut
  // document.querySelectorAll('.logOut').forEach(element => {
  //   if (loggedIn) {
  //     element.classList.add('hidden');
  //   } else {
  //     element.classList.remove('hidden');
  //   }
  // })
  // document.querySelectorAll('.admin').forEach(element => {
  //   if (dataUser && dataUser.admin) {
  //     element.classList.remove('hidden');
  //     console.log('aaaa');
  //   } else {
  //     element.classList.add('hidden');
  //     console.log('bb');
  //   }
  // })
  
  if(loggedIn && dataUser){
    loginDefault(); 
    if(dataUser.admin){
      loginAdmin(); 
      console.log('admin');
    }
  }else{
    logOutDefault(); 
  }
}


const loginDefault = () => {
  authModal.classList.remove('modal-active');
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
  })
}
const logOutDefault = () => {
  document.querySelectorAll('.product__pay-btn').forEach(elem => {
    elem.innerHTML = `<img src="./lib/svg/bag.svg" alt=""> add to cart`
  })
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