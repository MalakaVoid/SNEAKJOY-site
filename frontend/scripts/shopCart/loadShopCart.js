window.addEventListener('load', async function(){
    let shopCart = localStorage.getItem('shopCart');
    shopCart = JSON.parse(shopCart);

    if (!checkShopCartExistance()) return

    let products = await getProducts();

    changeProductCartAmount(products);
    loadCartProducts(products);
    changeTotalPrice();
    addListenersToPickers();
})

function addListenersToPickers(){
    let addPicker = document.querySelectorAll('.shop_cart_card_amount_picker_more');
    let subPicker = document.querySelectorAll('.shop_cart_card_amount_picker_less');

    console.log(addPicker)
    addPicker.forEach((item) => item.addEventListener('click', addPickerClick))
    
    subPicker.forEach((item) => item.addEventListener('click', subPickerClick))
}

async function getProducts(){
    let shopCart = localStorage.getItem('shopCart');
    shopCart = JSON.parse(shopCart);
    let productsFromServer = await getProductsFromServer(shopCart);

    let products = []
    for (let item of shopCart) {
        let productInfo = productsFromServer.filter(product => product.id == item.id);
        let product = productInfo[0];
        products.push({...product, amount: item.amount, size: item.size});
    }
    return products;
}

function loadCartProducts(products){
    let prdocutsContainer = document.querySelector('#cartProductContainer');

    for (let product of products) {
        let card = document.createElement('div');
        card.classList.add('shop_cart_card');
    
        card.innerHTML =`
            <div class="shop_cart_card_image">
                <img src="${product.mainImage}" />
            </div>
            <div class="shop_cart_card_info">
                <div class="shop_cart_card_info_title">
                    ${product.title}
                </div>
                <div class="shop_cart_card_info_size">
                    Размер: <span>${product.size}</span>
                </div>
            </div>
            <div class="shop_cart_card_amount">
                <div class="shop_cart_card_amount_picker">
                    <input type='hidden' name='id' value="${product.id}" />
                    <input type='hidden' name='size' value="${product.size}" />
                    <div class="shop_cart_card_amount_picker_more">+</div>
                    <div class="shop_cart_card_amount_picker_num">${product.amount}</div>
                    <div class="shop_cart_card_amount_picker_less">—</div>
                </div>
            </div>
            <div class="shop_cart_card_price">
                ${product.price.toLocaleString('ru-RU', { style: 'currency', currency: 'RUB', maximumFractionDigits: 0 })}
            </div>
        `;
    
        prdocutsContainer.appendChild(card);
    }
}

async function getProductsFromServer(shopCart){
    let productIds = [];
    shopCart.forEach(item => {
        productIds.push(item.id);
    });

    let uniqIds = [...new Set(productIds)];

    let message = {
        productIds: uniqIds
    }

    let response = await fetch('/api/products/getproductsbyid', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(message)
    })

    let result = await response.json();

    return result;
}

function changeProductCartAmount(shopCart){
    let count = 0;
    
    count = shopCart.reduce((acc, item) =>{
        return acc + item.amount;
    }, 0);
    
    shopCartAmount = document.querySelector('#cartProductAmount');
    shopCartAmount.innerHTML = `${count} товаров`;
}

async function changeTotalPrice(){
    let shopCart = await getProducts();
    let totalPrice = 0;

    if (shopCart == null || shopCart.length == 0) {
        totalPrice = 0;
    } else {
        totalPrice = shopCart.reduce((acc, item) =>{
            return acc + item.amount * item.price;
        }, 0);
    }
    totalPrice = totalPrice.toLocaleString('ru-RU', { style: 'currency', currency: 'RUB', maximumFractionDigits: 0 });
    totalPriceContainer = document.querySelector('#cartTotal');
    totalPriceContainer.innerHTML = totalPrice;
}

function checkShopCartExistance(){
    let shopCart = localStorage.getItem('shopCart');
    shopCart = JSON.parse(shopCart);

    if (shopCart == null || shopCart.length === 0){
        let prdocutsContainer = document.querySelector('.shop_cart_wrapper');
        prdocutsContainer.innerHTML = '<div class="shop_cart__empty">Корзина пуста</div>';
        return false;
    }
    return true;
}