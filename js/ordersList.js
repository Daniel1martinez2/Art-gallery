const ordersContainer = document.querySelector('.orders__wrap');
db.collection('orders')
.get()
.then((querySnapshot)=>{
  querySnapshot.forEach(doc => {
    const currentOrder = doc.data(); 
    console.log(currentOrder);
    const orderElem = document.createElement('div'); 
    orderElem.classList.add('order'); 
    orderElem.innerHTML = `<div class="order__main-info">
    <h1 class="order__name">${currentOrder.name}</h1>
    <h3 class="order__time">${new Date(currentOrder.date.seconds * 1000).toLocaleDateString("en-US") }</h3>
  </div>
  <h3 class="order__items"><span class="order__number">${currentOrder.products.length}</span> products</h3>`; 
  ordersContainer.appendChild(orderElem); 
  });
})