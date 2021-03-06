const cardsType = document.querySelectorAll('.checkout__cards-opt img');
const checkoutForm = document.querySelector('.checkout__form');

cardsType.forEach((elem) => {
  elem.addEventListener('click', () => {
    cardsType.forEach((card) => card.classList.remove('selected'))
    elem.classList.add('selected');
  })
});

document.querySelector('.checkout__pay').addEventListener('click', (event) => {
  event.preventDefault();
  let orderTotalPrice = 0;
  cart.forEach((currentProduct, index) => orderTotalPrice += currentProduct.price);
  orderTotalPrice += 10;
  const currentOrder = {
    userUID: loggedUser.uid, //loggedUser.uid,
    date: new Date(Date.now()),
    price: orderTotalPrice,
    products: cart.map(a => a.id),
    name: checkoutForm.name.value,
    id: checkoutForm.id.value,
    address: checkoutForm.address.value
  }
  db.collection("orders").add(currentOrder)
  .then((docRef)=>{
    console.log('nice',docRef.id);
    defaultCartState();
    checkoutForm.name.value = ''; 
    checkoutForm.id.value = ''; 
    checkoutForm.address.value = ''; 
    checkoutForm.classList.add('hidden'); 
    document.querySelector('.checkout-done').classList.remove('hidden');
    console.log(cart);
  })
  .catch((error)=>console.log(error))
});

