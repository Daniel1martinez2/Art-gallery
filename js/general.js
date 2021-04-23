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
let isUser = false; 
const db = firebase.firestore();
const storage = firebase.storage(); 
firebase.auth().onAuthStateChanged((user)=>{
  if(user){
    let uid = user.uid; 
    console.log(uid);
    db.collection("users")
    .doc(uid)
    .get()
    .then((doc)=>{
      isUser = true;
      const loggedUser = doc.data(); 
      const loginText = document.querySelector('.shop-header__login-btn');
      const logOut = document.querySelector('.shop-header__log-out-btn'); 
      const userNameText = document.querySelector('.shop-header__user-name');  
      if(loginText) loginText.classList.add('hidden'); 
      if(logOut)logOut.classList.remove('hidden'); 
      if(userNameText && doc.data()) {
        userNameText?.classList.remove('hidden'); 
        userNameText.innerText = `Hi ${loggedUser?.name.length > 6 ? loggedUser?.name.slice(0,6) + '...': loggedUser?.name}`; 
      }
    })
  }else{

  }
}) 
//star stuff
const starsMath = (rating) => {
  const stars = []; 
  for (let index = 0; index < Math.trunc(rating); index++) stars.push('full'); 
  if(rating - Math.trunc(rating) > 0) stars.push('half'); 
  for (let index = 0; index < 5 - Math.ceil(rating); index++) stars.push('empty'); 
  return stars; 
}

