//elements
const loginBtn = document.querySelector('.shop-header__login-btn'); 
const settingsToggle = document.querySelector('.shop-header__settings-btn');
const logOut = document.querySelector('.shop-header__log-out-btn');
const shopSettings = document.querySelector('.shop-settings ');
const productContainer = document.querySelector('.shop-products');
const sortOptions = document.querySelector('.shop-settings__sort');
const sortItems = document.querySelectorAll('.shop-settings__sort-item');
const addProduct = document.querySelector('.shop-header__add-product');
setTransition(document.querySelector('.shop-header__bag'),'./cart.html'); 
const sortOptionsArray = [{
    checked: false,
    name: 'Popular'
  },
  {
    checked: false,
    name: 'Cheaper'
  },
  {
    checked: false,
    name: 'Alphabetic'
  },
];
//initialization
//all products
db.collection('products')
  .get()
  .then((querySnapshot) => {
    productContainer.innerHTML = '';
    querySnapshot.forEach(doc => {
      const current = doc.data();
      createProduct(current, doc.id);
    });
  }); 
const createProduct = (doc, id) => {
  const product = document.createElement('div');
  product.classList.add('product');
  const starsArray = starsMath(doc.rating); 
  product.innerHTML = `
  <a class="product-detail-page" href="./productDetail.html?product=${id}">
    <img class="product__img"  src="${doc.images[0]?.url || '../lib/img/noImage.png'}" alt="">
  </a>
  <aside class="product__info">
    <div class="product__name-rate">
      <h1>${doc.name.length > 12 ? doc.name.slice(0,12) + '...': doc.name}</h1>
      <div class="product__stars">
        <img src="./lib/svg/star-${starsArray[0]}.svg" alt="" class="product__star--full">
        <img src="./lib/svg/star-${starsArray[1]}.svg" alt="" class="product__star--full">
        <img src="./lib/svg/star-${starsArray[2]}.svg" alt="" class="product__star--full">
        <img src="./lib/svg/star-${starsArray[3]}.svg" alt="" class="product__star--full">
        <img src="./lib/svg/star-${starsArray[4]}.svg" alt="" class="product__star--full">
      </div>
    </div>
    <div class="product__payment">
      <h3 class="product__price">$ ${doc.price}</h3>
      <button class="product__pay-btn">
        <img src="./lib/svg/bag.svg" alt="">
        ${loggedUser?.admin ? 'edit product' :'add to cart'}
      </button>
    </div>
  </aside>`;
  const thumbBtn = product.querySelector('.product__pay-btn');
  thumbBtn.addEventListener('click',()=>{
    if(!loggedUser){
      authModal.classList.add('modal-active'); 
    }else{
      if(loggedUser.admin){
        window.location = './editProducts.html?product='+id; 
        console.log('admin user');
      }else{
        cart.push({...doc,id});
        localStorage.setItem('store__cart', JSON.stringify(cart));
        cartBtnNumber.forEach(elem =>elem.innerText = cart.length );
        console.log(cartBtnNumber);
        console.log('normal user');
      }
    }
  }); 

  setTransition(product.querySelector('.product-detail-page'), `./productDetail.html?product=${id}`);
  productContainer.appendChild(product);

}
const formChange = () => {
  let productsCollection = db.collection('products');
  if (shopSettings.country.value) {
    productsCollection = productsCollection.where('country', '==', shopSettings.country.value);
  }
  if (shopSettings.technique.value) {
    productsCollection = productsCollection.where('technique', '==', shopSettings.technique.value);
  }
  if (shopSettings.vanguard.value) {
    productsCollection = productsCollection.where('vanguard', '==', shopSettings.vanguard.value);
  }
  const currentSelected = sortOptionsArray.filter((element) => element.checked);
  if (currentSelected[0]?.name) {
    console.log(currentSelected[0]?.name);
    switch (currentSelected[0]?.name) {
      case 'Popular':
        productsCollection = productsCollection.orderBy('rating', 'desc');
        break;
      case 'Cheaper':
        productsCollection = productsCollection.orderBy('price', 'asc');
        break;
        case 'Alphabetic':
        productsCollection = productsCollection.orderBy('name', 'asc');
        break;
      default:
        break;
    }
  }
  productsCollection
    .get()
    .then((querySnapshot) => {
      productContainer.innerHTML = '';
      querySnapshot.forEach(doc => {
        createProduct(doc.data(), doc.id);
      });
    }) ;
}
//events
settingsToggle.addEventListener('click', () => {
  shopSettings.classList.toggle('hidden');
  settingsToggle.querySelector('path').classList.toggle('shop-header__features--active');
});
//logOut
logOut.addEventListener('click', ()=>{
  firebase.auth().signOut()
  .then(()=>{
    loggedUser = null;
    defaultCartState(); 
    cartBtnNumber.forEach(elem =>elem.innerText = cart.length );
    console.log('session was closed');
    dataUser=null; 
    console.log(dataUser,'⚠️⚠️⚠️');     
  })
  .catch((error)=>console.log(error)); 
});

addProduct.addEventListener('click', ()=> window.location = './editProducts.html')

//select inputs stuff
shopSettings.addEventListener('change', formChange);
loginBtn.addEventListener('click',()=> {
  authModal.classList.add('modal-active'); 
});
//sort stuff
sortItems.forEach((item, i) => {
  item.addEventListener('click', (event) => {
    event.preventDefault(); 
    let state = sortOptionsArray[i].checked;
    sortOptionsArray.forEach((element, index) => {
      element.checked = false;
      sortItems[index].classList.remove('shop-settings__sort-item--active');
    });
    if (!state) {
      sortOptionsArray[i].checked = !sortOptionsArray[i].checked;
      item.classList.toggle('shop-settings__sort-item--active');
    }
    formChange(); 
  });
});


