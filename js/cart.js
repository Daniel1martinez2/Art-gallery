const productsCartContainer = document.querySelector('.cart__products-container');
const subtotalElem = document.querySelector('.subtotal-number');
const totalElem = document.querySelector('.total-number');

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
}); 

subtotalElem.innerText = `$${subtotal}.00`; 
totalElem.innerText = `$${subtotal + 10}.00`; 
