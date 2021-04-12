// referencing elements from DOM
const form = document.querySelector('.edit-form');
const prevThumbs = document.querySelectorAll('.edit-form__img-prev');
const prevContainer = document.querySelector('.edit-form__preview');
const filesArray = [];


form.file.addEventListener('change', () => {
  let file = form.file.files[0];
  if (!file) return
  let reader = new FileReader();
  reader.onload = (e) => {
    imgThumb.style.backgroundImage = `url(${e.target.result})`;
  }
  // convert to base64 string
  reader.readAsDataURL(form.file.files[0]);
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
  };
  const genericCatch = (error)=> {
    console.log('There was an error in the product upload');
  }
  db.collection("products").add(product)
    .then((docRef) => {
      //reference to all promises i will do, so then i can wait for all to finish
      const uploadPromises = [];
      const downloadUrlPromises = [];
      
      filesArray.forEach( (file)=> {
        let storageRef = firebase.storage().ref();
        let fileRef = storageRef.child(`products/${docRef.id}/${file.name}`);
        // espera a subir la imagen
        uploadPromises.push(fileRef.put(file));
      });
      //
      Promise.all(uploadPromises).then( (snapshots)=> {
        snapshots.forEach( (snapshot)=> {
          // espera a obtener la url de descarga de la imagen
          downloadUrlPromises.push(snapshot.ref.getDownloadURL());
        });
        Promise.all(downloadUrlPromises).then( (downloadURLs)=> {
  
          const images = [];
          downloadURLs.forEach((url, index) => {
            images.push({
              url: url,
              ref: snapshots[index].ref.fullPath
            });
          });
          db.collection('products').doc(docRef.id).update({
            images: images
          }).then( ()=>{
              form.name.value = ''; 
              form.author.value = ''; 
              form.year.value = ''; 
              form.price.value = ''; 
              form.country.value = ''; 
              form.rating.value = ''; 
              form.technique.value = ''; 
              form.vanguard.value = ''; 
              form.description.value = ''; 
              prevContainer.innerHTML = ''; 
              //reset files array
              while (filesArray.length) {
                filesArray.pop();
              }
              console.log(filesArray);
          })
          .catch(genericCatch);
        })
        .catch(genericCatch);
      })
      .catch(genericCatch);
      //
      console.log("Document added", docRef.id);
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });
});
