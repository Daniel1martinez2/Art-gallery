//elements
const settingsToggle = document.querySelector('.shop-header__settings-btn');
const shopSettings = document.querySelector('.shop-settings ');
const productContainer = document.querySelector('.shop-products');
const sortOptions = document.querySelector('.shop-settings__sort');
const sortItems = document.querySelectorAll('.shop-settings__sort-item'); 
// const allSelectInputs = document.querySelectorAll('.drop'); 
// console.log(allSelectInputs[0].value);
const settingsFilter = document.querySelector('.shop-settings__filter'); 
console.log(settingsFilter);
 const sortOptionsArray = [
  {
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

const createProduct = (doc) => {
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
  productContainer.appendChild(product);

}

//events
settingsToggle.addEventListener('click', () => {
  shopSettings.classList.toggle('hidden');
  settingsToggle.querySelector('path').classList.toggle('shop-header__features--active');
});
//select inputs stuff
settingsFilter.addEventListener('change', ()=>{
  let productsCollection = db.collection('products');

  if(settingsFilter.country.value) {
    productsCollection = productsCollection.where('country', '==', settingsFilter.country.value);
  }
  if(settingsFilter.technique.value) {
    productsCollection = productsCollection.where('technique', '==', settingsFilter.technique.value);
  }
  if(settingsFilter.vanguard.value) {
    productsCollection = productsCollection.where('vanguard', '==', settingsFilter.vanguard.value);
  }

  productsCollection
  .get()
  .then((querySnapshot) => {
    productContainer.innerHTML = '';
    querySnapshot.forEach(doc => {
      createProduct(doc.data());
    });
  })

}); 

//sort stuff
sortItems.forEach((item, i) => {
  item.addEventListener('click',()=>{
    let state = sortOptionsArray[i].checked; 
    sortOptionsArray.forEach((element,index) => {
      element.checked = false; 
      sortItems[index].classList.remove('shop-settings__sort-item--active'); 
    });
    if(!state){
      sortOptionsArray[i].checked = !sortOptionsArray[i].checked; 
      item.classList.toggle('shop-settings__sort-item--active'); 
    }
    console.log(sortOptionsArray);
  
  });  
});



//dataBase Stuff
db.collection('products')
  .get()
  .then((querySnapshot) => {
    productContainer.innerHTML = '';
    querySnapshot.forEach(doc => {
      const current = doc.data();
      createProduct(current);
    });
  })
