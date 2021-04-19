//elements
const loginBtn = document.querySelector('.shop-header__login-btn'); 
const modalBg = document.querySelector('.modal-bg'); 
const closeModalBtn = document.querySelector('.modal__close-btn'); 
const loginModalBtn = document.querySelector('.modal__login'); 
const registerModalBtn = document.querySelector('.modal__register'); 
const modalBtnContainer = document.querySelector('.modal__buttons'); 
const confirmPassword = document.querySelector('.confirm-password'); 

const settingsToggle = document.querySelector('.shop-header__settings-btn');
const shopSettings = document.querySelector('.shop-settings ');
const productContainer = document.querySelector('.shop-products');
const sortOptions = document.querySelector('.shop-settings__sort');
const sortItems = document.querySelectorAll('.shop-settings__sort-item');
console.log(shopSettings);
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
  product.innerHTML = `
  <a href="#">
    <img class="product__img"  src="${doc.images[0].url}" alt="">
  </a>
  <aside class="product__info">
    <div class="product__name-rate">
      <h1>${doc.name.length > 11 ? doc.name.slice(0,11) + '...': doc.name}</h1>
      <div class="product__stars">
        <img src="./lib/svg/star-full.svg" alt="" class="product__star--full">
        <img src="./lib/svg/star-full.svg" alt="" class="product__star--full">
        <img src="./lib/svg/star-full.svg" alt="" class="product__star--full">
        <img src="./lib/svg/star-full.svg" alt="" class="product__star--full">
        <img src="./lib/svg/star-half.svg" alt="" class="product__star--half">
      </div>
    </div>
    <div class="product__payment">
      <h3 class="product__price">$ ${doc.price}</h3>
      <button class="product__pay-btn">
        <img src="./lib/svg/bag.svg" alt="">
        add to cart
      </button>
    </div>
  </aside>`;
  const thumbBtn = product.querySelector('.product__pay-btn'); 
  thumbBtn.addEventListener('click',()=>console.log(id)); 
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
//select inputs stuff
shopSettings.addEventListener('change', formChange);

loginBtn.addEventListener('click',()=> modalBg.classList.add('modal-active')); 
closeModalBtn.addEventListener('click',()=> modalBg.classList.remove('modal-active')); 
loginModalBtn.addEventListener('click', (event)=>{
  event.preventDefault(); 
  if(loginModalBtn.classList.contains('modal__btn--active')) console.log('login info');
  confirmPassword.classList.add('hidden');
  modalBtnContainer.style.flexDirection = 'column'; 
  loginModalBtn.classList.add('modal__btn--active'); 
  registerModalBtn.classList.remove('modal__btn--active'); 
}); 
registerModalBtn.addEventListener('click', (event)=>{
  if(registerModalBtn.classList.contains('modal__btn--active')) console.log('register info');
  event.preventDefault(); 
  confirmPassword.classList.remove('hidden');
  modalBtnContainer.style.flexDirection = 'column-reverse'; 
  loginModalBtn.classList.remove('modal__btn--active'); 
  registerModalBtn.classList.add('modal__btn--active'); 
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


