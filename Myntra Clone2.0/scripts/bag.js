const CONVENIENCE_FEES = 99;
let bagitemsobject;
onload();
function onload() {
  loadbagitemsobject();
  displaybagitems();
  displaybagsummary();
}

function displaybagsummary() {
  let bagsummaryelement = document.querySelector('.bag-summary');
  let totalitem = bagitemsobject.length;
  let totalMRP = 0;
  let totalDiscount = 0;

  bagitemsobject.forEach(bagitems => {
    totalMRP += bagitems.original_price;
    totalDiscount += bagitems.original_price - bagitems.current_price;
  });

  let finalPayment = totalMRP - totalDiscount + CONVENIENCE_FEES;

  bagsummaryelement.innerHTML =
    `<div class="bag-details-container">
            <div class="price-header">PRICE DETAILS (${totalitem} Items) </div>
            <div class="price-item">
              <span class="price-item-tag">Total MRP</span>
              <span class="price-item-value">₹${totalMRP}</span>
            </div>
            <div class="price-item">
              <span class="price-item-tag">Discount on MRP</span>
              <span class="price-item-value priceDetail-base-discount">-₹${totalDiscount}</span>
            </div>
            <div class="price-item">
              <span class="price-item-tag">Convenience Fee</span>
              <span class="price-item-value">₹ 99</span>
            </div>
            <hr>
            <div class="price-footer">
              <span class="price-item-tag">Total Amount</span>
              <span class="price-item-value">₹${finalPayment}</span>
            </div>
          </div>
          <button class="btn-place-order">
            <div class="css-xjhrni">PLACE ORDER</div>
          </button>`;
}

function loadbagitemsobject() {
  console.log(bagitems);
  bagitemsobject = bagitems.map(itemid => {
    for (let i = 0; i < items.length; i++) {
      if (itemid == items[i].id) {
        return items[i];
      }
    }
  });
  console.log(bagitemsobject);
}

function displaybagitems() {
  let containerElement = document.querySelector('.bag-items-container');
  let innerHTML = '';
  bagitemsobject.forEach(bagitems => {
    innerHTML += generateitemhtml(bagitems);
  });
  containerElement.innerHTML = innerHTML;
}
function removefrombag(itemid) {
  bagitems = bagitems.filter(bagitemid => bagitemid != itemid);
  localStorage.setItem('bagitems', JSON.stringify(bagitems));
  loadbagitemsobject();
  displaybagicon();
  displaybagitems();
  displaybagsummary();
}

function generateitemhtml(item) {
  return `<div class="bag-item-container">
            <div class="item-left-part">
              <img class="bag-item-img" src="${item.image}">
            </div>
            <div class="item-right-part">
              <div class="company">${item.comapny}</div>
              <div class="item-name">${item.item_name}</div>
              <div class="price-container">
                <span class="current-price">Rs ${item.current_price}</span>
                <span class="original-price">Rs ${item.original_price}</span>
                <span class="discount-percentage">(${item.discount_percentage}% OFF)</span>
              </div>
              <div class="return-period">
                <span class="return-period-days">${item.return_period} days</span> return available
              </div>
              <div class="delivery-details">
                Delivery by
                <span class="delivery-details-days">${item.delivery_date}</span>
              </div>
            </div>

            <div class="remove-from-cart" onclick = "removefrombag(${item.id})">X</div>
          </div>`;
}