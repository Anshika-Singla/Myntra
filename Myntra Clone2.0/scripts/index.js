let bagitems;
onload();

function onload() {
    let bagitemsStr = localStorage.getItem('bagitems');
    bagitems = bagitemsStr ? JSON.parse(bagitemsStr) : [];
    displayitemsonhome();
    displaybagicon();
}

function addToBag(itemId) {
    bagitems.push(itemId);
    localStorage.setItem('bagitems', JSON.stringify(bagitems));
    displaybagicon();
}

function displaybagicon() {
    let bagitemcountelement = document.querySelector('.bag-item-count');
    if (bagitems.length > 0) {
        bagitemcountelement.style.visibility = 'visible';
        bagitemcountelement.innerText = bagitems.length;
    } else {
        bagitemcountelement.style.visibility = 'hidden';
    }
}

function displayitemsonhome() {
    let itemsContainerElement = document.querySelector('.items-container');
    if (!itemsContainerElement) {
        return;
    }

    let innerHTML = '';
    items.forEach(item => {
        innerHTML += `<div class="item-container">
            <img class="item-image" src="${item.image}" alt="item image">
            <div class="rating">
                ${item.rating.stars}⭐ | ${item.rating.count}
            </div>
            <div class="company_name">${item.company}</div>
            <div class="item-name">${item.item_name}</div>
            <div class="price">
                <span class="current-price">Rs${item.current_price}</span>
                <span class="original-price">Rs ${item.original_price}</span>
                <span class="discount">(${item.discount_percentage}% OFF)</span>
            </div>
            <button class="btn-add-bag" 
            onclick="addToBag(${item.id})">Add to Bag</button>
        </div>`
    });
    itemsContainerElement.innerHTML = innerHTML;
}