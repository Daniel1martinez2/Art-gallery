const productsCartContainer = document.querySelector('.cart__products-container');
const subtotalElem = document.querySelector('.subtotal-number');
const totalElem = document.querySelector('.total-number');
const notProducts = document.querySelector('.cart__not-products');
const payment = document.querySelector('.payment');
document.querySelector('.cart__items-number').innerText = cart.length;
const updateCartProductState = () => {
  subtotalElem.innerText = `$${subtotal}.00`; 
  totalElem.innerText = `$${subtotal + 10}.00`; 
  if(cart.length > 0){
    payment.classList.remove('hidden'); 
    notProducts.classList.add('hidden'); 
  }else{
    payment.classList.add('hidden'); 
    notProducts.classList.remove('hidden'); 
  }
}
let subtotal = 0; 
cart.forEach((currentProduct, index)=>{
  console.log(currentProduct);
  const cartProduct = document.createElement('div'); 
  cartProduct.classList.add('cart__product'); 
  cartProduct.innerHTML = `  
    <div class="cart__product-main-info">
    <img src="${currentProduct.images[0].url}" alt="">
    <div class="cart__product-name-price">
      <h1>${currentProduct.name.length > 13? currentProduct.name.slice(0,13) + '...': currentProduct.name }</h1>
      <h3>$${currentProduct.price}</h3>
    </div>
  </div>
  <button class="cart__product-delete">
    <img src="./lib/svg/delete.svg" alt="">
  </button>`; 
  productsCartContainer.appendChild(cartProduct); 
  subtotal += currentProduct.price
  cartProduct.querySelector('.cart__product-delete').addEventListener('click', ()=>{
    subtotal -= currentProduct.price; 
    cart.splice(cart.indexOf(currentProduct), 1);
    localStorage.setItem('store__cart', JSON.stringify(cart));
    productsCartContainer.removeChild(cartProduct);
    console.log('testing removing', cart);
    document.querySelector('.cart__items-number').innerText = cart.length;
    updateCartProductState(); 
    
  });
}); 
updateCartProductState(); 

