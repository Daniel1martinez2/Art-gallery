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
  console.log(loggedUser+' >>>>>>');
  if(user){
    let uid = user.uid; 
    console.log(uid);
    db.collection("users")
    .doc(uid)
    .get()
    .then((doc)=>{
      dataUser = doc.data(); 
      loggedUser = dataUser;
      loggedUser.uid = uid; 
      userAuthChanged(true,dataUser); 
      console.log(loggedUser);
    })
    .catch((error)=>console.log(error.message))
  }else{
    loggedUser = null; 
    dataUser = null; 
    userAuthChanged(false,dataUser); 
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

