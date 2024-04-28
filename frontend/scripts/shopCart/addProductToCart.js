function addProductToCart(productId, size){

    let user = localStorage.getItem('user');
    if (user === null){
        window.location.replace("/authorization");
        return;
    }

    let shopCart = localStorage.getItem("shopCart");

    if (shopCart == null){
        shopCart = [];
    } else {
        shopCart = JSON.parse(shopCart);
    }

    let product = shopCart.filter(item => item.id == productId && item.size == size);
    let newShopCart = [];
    if (product[0]){
        newShopCart = shopCart.map((item) => {
            if (item.id == productId && item.size == size){
                item.amount++;
            }
            return item;
        });
    } 
    else{
        newShopCart = [...shopCart, {id: productId, amount: 1, size: size}];
    }

    localStorage.setItem("shopCart", JSON.stringify(newShopCart));
    changeHeaderCartCounter();
}