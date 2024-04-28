window.addEventListener('load', function(e){
    let button = document.querySelector('#addToCartBtn');
    button.addEventListener('click', addProductToCartCard);
});

function addProductToCartCard(event){
    let sizeField = document.querySelector('#sizeField');
    
    let productId = parseInt(event.target.value);
    let productSize = parseInt(sizeField.value);
    console.log(productSize);

    if (isNaN(productSize)) {
        console.log(productSize);
        return;
    }
    
    let shopCart = localStorage.getItem("shopCart");
    if (shopCart == null){
        shopCart = [];
    } else {
        shopCart = JSON.parse(shopCart);
    }

    let product = shopCart.filter(item => item.id == productId && item.size == productSize);
    let newShopCart = [];
    if (product[0]){
        newShopCart = shopCart.map((item) => {
            if (item.id == productId && item.size == productSize){
                item.amount++;
            }
            return item;
        });
    } 
    else{
        newShopCart = [...shopCart, {id: productId, amount: 1, size: productSize}];
    }

    localStorage.setItem("shopCart", JSON.stringify(newShopCart));
    changeHeaderCartCounter();
}