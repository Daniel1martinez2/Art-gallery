//firebase
const firebaseConfig = {
  apiKey: "AIzaSyCfLGPC7xC9sV6-0vgEKHENoNLyvk28S74",
  authDomain: "artgallery-896d7.firebaseapp.com",
  projectId: "artgallery-896d7",
  storageBucket: "artgallery-896d7.appspot.com",
  messagingSenderId: "894275339407",
  appId: "1:894275339407:web:49452bb914723932c75cfa"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
let loggedUser = null; 
const db = firebase.firestore();
const storage = firebase.storage(); 
let dataUser = null; 
firebase.auth().onAuthStateChanged((user)=>{
  if(user){ 
    console.log(user.uid);
    db.collection("users")
    .doc(user.uid)
    .get()
    .then((doc)=>{
      dataUser = doc.data(); 
      loggedUser = dataUser;
      loggedUser.uid = user.uid; 
      userAuthChanged(true,dataUser); 
      console.log(doc.data());
      if(typeof checkProductFormAdmin !== 'undefined') checkProductFormAdmin();
    })
    .catch((error)=>console.log(error.message))
  }else{
    dataUser = null; 
    loggedUser = null; 
    localStorage.clear();
    cartBtnNumber.innerText = '0';
    if(typeof checkProductFormAdmin !== 'undefined') checkProductFormAdmin();
    userAuthChanged(false,dataUser); 
  }
}) 
//cart stuff
let cart = [];
const cartBtnNumber = document.querySelectorAll('.cart-length');

const cartFromLS = localStorage.getItem('store__cart');
if(cartFromLS) {
  cart = JSON.parse(cartFromLS);
  if(cartBtnNumber) {
    cartBtnNumber.forEach(elem =>elem.innerText = cart.length );
  }
} 

const defaultCartState = ()=>{
  localStorage.clear(); 
  while (cart.length) {
    cart.pop();
  }
}
//star stuff
const starsMath = (rating) => {
  const stars = []; 
  for (let index = 0; index < Math.trunc(rating); index++) stars.push('full'); 
  if(rating - Math.trunc(rating) > 0) stars.push('half'); 
  for (let index = 0; index < 5 - Math.ceil(rating); index++) stars.push('empty'); 
  return stars; 
}

