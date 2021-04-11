// referencing elements from DOM
const form = document.querySelector('.edit-form');
const prevThumbs = document.querySelectorAll('.edit-form__img-prev');
const prevContainer = document.querySelector('.edit-form__preview');
const filesArray = [];


form.file.addEventListener('change', () => {
  let reader = new FileReader();
  reader.onload = (e) => {
    imgThumb.style.backgroundImage = `url(${e.target.result})`;
  }
  reader.readAsDataURL(form.file.files[0]); // convert to base64 string
  //add current selected file to the array
  filesArray.push(form.file.files[0]);
  console.log(filesArray);
  const imgThumb = document.createElement('div');
  imgThumb.classList.add('edit-form__img-prev');
  imgThumb.innerHTML =
    `<button>
    <img src="./lib/svg/close-salmon.svg" alt="">
  </button>`;
  prevContainer.appendChild(imgThumb);
})

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const product = {
    name: form.name.value,
    author: form.author.value,
    year: parseInt(form.year.value),
    price: parseInt(form.price.value),
    country: form.country.value,
    rating: parseFloat(form.rating.value),
    technique: form.technique.value,
    vanguard: form.vanguard.value,
    description: form.description.value, 
    images: [],
  }
  let storageRef = firebase.storage().ref();
  filesArray.forEach((file)=>{
    let fileRef = storageRef.child(`images/${file.name}`);
    fileRef.put(file).then((snapshot) => {
      snapshot.ref.getDownloadURL().then((downloadURL) => {
        product.images.push({
          imageUrl: downloadURL,
          imageRef: snapshot.ref.fullPath,
        }); 
        console.log('File available at', downloadURL);
        console.log(product);
        //dudaaaaaa-------->>>>>>>---->>>>-----
        if(product.images[2]!= undefined){
          console.log('eoooooo');
          db.collection("products").add(product)
          .then((docRef) => {
            console.log("Document added", docRef.id);
          })
          .catch((error) => {
            console.error("Error adding document: ", error);
          });
        }
      });
    });
  
  }); 




});
