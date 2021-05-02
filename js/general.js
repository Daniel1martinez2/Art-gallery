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
let loggedUserUID = null; 
const db = firebase.firestore();
const storage = firebase.storage(); 
let dataUser = null; 
firebase.auth().onAuthStateChanged((user)=>{
  if(user){
    let uid = user.uid; 
    loggedUserUID = uid;
    console.log(uid);
    db.collection("users")
    .doc(uid)
    .get()
    .then((doc)=>{
      dataUser = doc.data(); 
      loggedUser = dataUser;
      loggedUser.uid = uid; 
      userAuthChanged(true,dataUser); 
      console.log(doc.data());
      console.log('Lorem ipsum dolor sit amet.');
    })
    .catch((error)=>console.log(error.message))
  }else{
    dataUser = null; 
    loggedUser = null; 
    localStorage.clear();
    cartBtnNumber.innerText = '0';
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
//star stuff
const starsMath = (rating) => {
  const stars = []; 
  for (let index = 0; index < Math.trunc(rating); index++) stars.push('full'); 
  if(rating - Math.trunc(rating) > 0) stars.push('half'); 
  for (let index = 0; index < 5 - Math.ceil(rating); index++) stars.push('empty'); 
  return stars; 
}

