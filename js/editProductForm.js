// referencing elements from DOM
const form = document.querySelector('.edit-form');
const prevThumbs = document.querySelectorAll('.edit-form__img-prev');
const prevContainer = document.querySelector('.edit-form__preview');
const clearBtn = document.querySelector('.edit-form__clear');
const loadAnimation = document.querySelector('.load-animation');
const filesArray = [];
const prevImg = [];
const params = new URLSearchParams(location.search);
let editing = false;
const deleteProduct = document.querySelector('.edit-product__delete');
const addImageThumb = (imgThumb) => {
  imgThumb.classList.add('edit-form__img-prev');
  imgThumb.innerHTML = `
    <button type="button" class="delete-image-btn" >
      <img src="./lib/svg/close-salmon.svg" alt="">
    </button>
  `;
  prevContainer.appendChild(imgThumb);
}
const genericCatch = (error) => {
  console.log('There was an error in the product upload');
}
if (params.get('product')) {
  deleteProduct.classList.remove('hidden');
  editing = true;
  //delete product stuff
  deleteProduct.addEventListener('click', () => {
    db.collection("products")
      .doc(params.get('product'))
      .delete()
      .then(() => {
        console.log("Document successfully deleted!");
        clearForm();
        clearImages();
        window.location = './shop.html';
      }).catch((error) => {
        console.error("Error removing document: ", error);
        window.location = './shop.html';
      });
  });
  db.collection('products')
    .doc(params.get('product'))
    .get()
    .then((doc) => {
      const data = doc.data();
      console.log(data);
      form.name.value = data.name;
      form.author.value = data.author;
      form.year.value = data.year;
      form.price.value = data.price;
      form.country.value = data.country;
      form.rating.value = data.rating;
      form.technique.value = data.technique;
      form.vanguard.value = data.vanguard;
      form.description.value = data.description;
      form.size.value = data.size;
      data.images.forEach((elem, index) => {
        const imgThumb = document.createElement('div');
        imgThumb.style.backgroundImage = `url(${elem.url})`;
        addImageThumb(imgThumb); 
        prevImg.push(elem);
        imgThumb.querySelector('.delete-image-btn').addEventListener('click', (event) => {
          prevContainer.removeChild(imgThumb);
          prevImg.splice(prevImg.indexOf(elem), 1);
          console.log(prevImg);
        });
      });
    })
    .catch((error) => window.location = './shop.html');
}
form.file.addEventListener('change', () => {
  let file = form.file.files[0];
  if (!file) return
  const imgThumb = document.createElement('div');
  let reader = new FileReader();
  reader.onload = (e) => {
    imgThumb.style.backgroundImage = `url(${e.target.result})`;
  }
  // convert to base64 string
  reader.readAsDataURL(file);
  //add current selected file to the array
  filesArray.push(file);
  addImageThumb(imgThumb); 
  imgThumb.querySelector('.delete-image-btn').addEventListener('click', (event) => {
    prevContainer.removeChild(imgThumb);
    filesArray.splice(filesArray.indexOf(file), 1);
  });
});
const clearImages = () => {
  prevContainer.innerHTML = '';
  //reset files array
  while (filesArray.length) {
    filesArray.pop();
  }
}
clearBtn.addEventListener('click', (event) => {
  event.preventDefault();
  clearImages();
});
form.addEventListener('submit', (event) => {
  event.preventDefault();
  loadAnimation.classList.remove('hidden');
  console.log('<<<<<<<<<>>>>>>>>' + editing);
  if (editing) {
    console.log('editing');
    db.collection('products').doc(params.get('product')).update({
        name: form.name.value,
        author: form.author.value,
        year: parseInt(form.year.value),
        price: parseInt(form.price.value),
        country: form.country.value,
        rating: parseFloat(form.rating.value),
        technique: form.technique.value,
        vanguard: form.vanguard.value,
        description: form.description.value,
        size: form.size.value,
        //images: [],
      }).then(() => {
        //the last thing that happens
        console.log('editing has been done');
        console.log(filesArray);
        addNewImage(params.get('product'),prevImg );
        
      })
      .catch((error) => console.log(error.message));
    return
  };
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
    size: form.size.value,
    images: [],
  };
  db.collection("products").add(product)
    .then((docRef) => {
      //reference to all promises i will do, so then i can wait for all to finish
      addNewImage(docRef.id,null);
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });
});
const clearForm = () => {
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
}
//upload a new image
const addNewImage = (id,prevImg) => {
  const uploadPromises = [];
  const downloadUrlPromises = [];

  filesArray.forEach((file) => {
    let storageRef = firebase.storage().ref();
    let fileRef = storageRef.child(`products/${id}/${file.name}`);
    // Wait for upload image
    uploadPromises.push(fileRef.put(file));
  });
  Promise.all(uploadPromises).then((snapshots) => {
      snapshots.forEach((snapshot) => {
        // Wait for image URL
        downloadUrlPromises.push(snapshot.ref.getDownloadURL());
      });
      Promise.all(downloadUrlPromises).then((downloadURLs) => {
          const images = prevImg? [...prevImg]:[];
          console.log(images,'🔥🔥🔥🔥');
          downloadURLs.forEach((url, index) => {
            images.push({
              url: url,
              ref: snapshots[index].ref.fullPath
            });
          });
          // add to my product
          db.collection('products').doc(id).update({
              images: images
            }).then(() => {
              //the last thing that happens
              if(!prevImg){
                clearForm();
                clearImages();
              }
              loadAnimation.classList.add('hidden');
              console.log('upload has been done');
            })
            .catch(genericCatch);
        })
        .catch(genericCatch);
    })
    .catch(genericCatch);
    if(prevImg){
      console.log("Document edited", id);
    }else console.log("Document added", id);
}

//prevent free editing 
const checkProductFormAdmin = () => {
  if(!loggedUser || !loggedUser.admin) {
    location.href = '/shop.html';
  }
}