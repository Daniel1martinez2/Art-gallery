const productsCartContainer = document.querySelector('.cart__products-container');

cart.forEach((currentProduct, index)=>{
  console.log(currentProduct);
  const cartProduct = document.createElement('div'); 
  cartProduct.classList.add('cart__product'); 
  cartProduct.innerHTML = `  
    <div class="cart__product-main-info">
    <img src="${currentProduct.images[0].url}" alt="">
    <div class="cart__product-name-price">
      <h1>${currentProduct.name}</h1>
      <h3>$${currentProduct.price}</h3>
    </div>
  </div>
  <button class="cart__product-delete">
    <img src="./lib/svg/delete.svg" alt="">
  </button>`; 
  productsCartContainer.appendChild(cartProduct); 
}); 