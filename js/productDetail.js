const params = new URLSearchParams(location.search); 
const id = params.get('product'); 
const productWrapper = document.createElement('main'); 
productWrapper.classList.add('product-detail-wrapper'); 
db.collection('products')
  .doc(id)
  .get()
  .then((doc)=>{
    const data = doc.data(); 
    if(!data) {
      location.href = './shop.html';
      return
    }
    const starsArray = starsMath(data.rating); 
    productWrapper.innerHTML = ` <main class="product-main">
    <header class="product-main__header">
      <a href="./shop.html">Shop</a>
      <a href="./cart.html" class="shop-header__bag notAdmin logged hidden">
        <img src="./lib/svg/bag.svg" alt="">
        <div class="cart-length ${cart.length >0? '': 'hidden'}">${cart.length ? cart.length: 0}</div>
      </a>
    </header>
    <article class="product-main__prime">
      <div class="product-main__title">
        <strong>${data.author}</strong>
        <h3>${data.country}, ${data.year}</h3>
      </div>
      <img class="product-main__img-big" src="${data.images[0]?.url || '../lib/img/noImage.png'}" alt="">
      <div class="product-main__img-set">
        <div  class="product-main__img-small product-main__img-small--active"> </div>
        <div  class="product-main__img-small"></div>
        <div  class="product-main__img-small"></div>
      </div>
    </article>
    </main>
    <aside class="detail">
    <article class="detail__info">
      <h3 class="detail__price">$${data.price}</h3>
      <h1 class="detail__name">${data.name}</h1>
      <p class="detail__description">${data.description}</p>
      <h4 class="detail__size">${data.size || '20 x 20 cm'} </h4>
      <div class="detail__stars">
        <img src="./lib/svg/star-${starsArray[0]}.svg" alt="" class="product__star--full">
        <img src="./lib/svg/star-${starsArray[1]}.svg" alt="" class="product__star--full">
        <img src="./lib/svg/star-${starsArray[2]}.svg" alt="" class="product__star--full">
        <img src="./lib/svg/star-${starsArray[3]}.svg" alt="" class="product__star--full">
        <img src="./lib/svg/star-${starsArray[4]}.svg" alt="" class="product__star--full">
      </div>
      <button class="detail__purchase">
        <img src="./lib/svg/bag.svg" alt="">
        <span class="btn-msg">
          Add to cart
        </span>
      </button>
    </article>
    </aside>`; 
    document.body.appendChild(productWrapper); 
    const thumbs = productWrapper.querySelectorAll('.product-main__img-small'); 
    const imgBig = productWrapper.querySelector('.product-main__img-big'); 
    thumbs.forEach((elem,i)=>{
      elem.style.backgroundImage = `url(${data.images[i]?.url || '../lib/img/noImage.png'})`; 
      elem.addEventListener('click', ()=>{
        imgBig.setAttribute('src',data.images[i]?.url || '../lib/img/noImage.png' ); 
        thumbs.forEach((element)=>element.classList.remove('product-main__img-small--active')); 
        elem.classList.add('product-main__img-small--active'); 
      }); 
    }); 
    productWrapper.querySelector('.detail__purchase').addEventListener('click', ()=>{
      
      if(!loggedUser){
        authModal.classList.add('modal-active'); 
      }else{
        if(loggedUser.admin){
          window.location = './editProducts.html?product='+id; 
          console.log('admin user');
        }else{
          cart.push({...data,id});
          localStorage.setItem('store__cart', JSON.stringify(cart));
          productWrapper.querySelector('.cart-length').classList.remove('hidden'); 
          productWrapper.querySelector('.cart-length').innerText = cart.length; 
          console.log(cartBtnNumber);
          console.log('normal user');
        }
      }
    });  
  });

