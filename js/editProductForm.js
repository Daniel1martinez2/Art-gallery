// referencing elements from DOM
const form = document.querySelector('.edit-form');
const prevThumbs = document.querySelectorAll('.edit-form__img-prev');
const prevContainer = document.querySelector('.edit-form__preview');
const clearBtn = document.querySelector('.edit-form__clear');
const filesArray = [];


form.file.addEventListener('change', () => {
  let file = form.file.files[0];
  if (!file) return
  let reader = new FileReader();
  reader.onload = (e) => {
    imgThumb.style.backgroundImage = `url(${e.target.result})`;
  }
  // convert to base64 string
  reader.readAsDataURL(file);
  //add current selected file to the array
  filesArray.push(file);
  const imgThumb = document.createElement('div');
  imgThumb.classList.add('edit-form__img-prev');
  const deleteImageBtn = document.createElement('button'); 
  deleteImageBtn.setAttribute('type','button');
  deleteImageBtn.innerHTML = ` <img src="./lib/svg/close-salmon.svg" alt="">`;
  imgThumb.appendChild(deleteImageBtn); 
  deleteImageBtn.addEventListener('click', (event)=>{
    prevContainer.removeChild(imgThumb); 
    filesArray.splice(filesArray.indexOf(file),1);
  }); 
  prevContainer.appendChild(imgThumb);
}); 
const clearImages = () => {
  prevContainer.innerHTML = ''; 
  //reset files array
  while (filesArray.length) {
    filesArray.pop();
  }
}
clearBtn.addEventListener('click', (event)=>{
  event.preventDefault();
  clearImages(); 
});

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
        // Wait for upload image
        uploadPromises.push(fileRef.put(file));
      });
      //
      Promise.all(uploadPromises).then( (snapshots)=> {
        snapshots.forEach( (snapshot)=> {
          // Wait for image URL
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
            //the last thing that happens
              form.name.value = ''; 
              form.author.value = ''; 
              form.year.value = ''; 
              form.price.value = ''; 
              form.country.value = ''; 
              form.rating.value = ''; 
              form.technique.value = ''; 
              form.vanguard.value = ''; 
              form.description.value = ''; 
              form.size.value = ''; 
              clearImages(); 
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
