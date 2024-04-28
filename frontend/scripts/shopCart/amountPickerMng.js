function addPickerClick(event){
    let parent = event.target.parentElement;
    let numberField = parent.querySelector('.shop_cart_card_amount_picker_num');
    let idField = parent.querySelector('[name="id"]');
    let productid = idField.value;
    let sizeField = parent.querySelector('[name="size"]');
    let productsize = sizeField.value;

    let amount = Number(numberField.innerHTML);
    amount++;
    numberField.innerHTML = amount;

    let shopCart = localStorage.getItem('shopCart');
    shopCart = JSON.parse(shopCart);

    let newShopCart = shopCart.map((item) => {
        if (item.id == productid && item.size == productsize) {
            item.amount = amount;
        }
        return item;
    })
    localStorage.setItem('shopCart', JSON.stringify(newShopCart));
    changeHeaderCartCounter();
    changeTotalPrice();
    checkShopCartExistance();
}

function subPickerClick(event){
    let parent = event.target.parentElement;
    let numberField = parent.querySelector('.shop_cart_card_amount_picker_num');
    let idField = parent.querySelector('[name="id"]');
    let productid = idField.value;
    let sizeField = parent.querySelector('[name="size"]');
    let productsize = sizeField.value;

    let shopCart = localStorage.getItem('shopCart');
    shopCart = JSON.parse(shopCart);
    let newShopCart = [];

    let amount = Number(numberField.innerHTML);
    amount--;
    numberField.innerHTML = amount;

    if (amount <= 0){
        let card = parent.closest('.shop_cart_card');
        card.remove();
        newShopCart = shopCart.filter(item => !(item.id == productid && item.size == productsize))
    } else{
        newShopCart = shopCart.map((item) => {
            if (item.id == productid && item.size == productsize){
                item.amount = amount;
            }
            return item;
        })
    }
    localStorage.setItem('shopCart', JSON.stringify(newShopCart));
    changeHeaderCartCounter();
    changeTotalPrice();
    checkShopCartExistance();
}