function addProductToCart(product_id, size){
    let shopCart = localStorage.getItem("shopCart");

    if (shopCart == null){
        shopCart = [];
    } else {
        shopCart = JSON.parse(shopCart);
    }

    let product = shopCart.filter(item => item.id == product_id && item.size == size);
    let newShopCart = [];
    if (product[0]){
        newShopCart = shopCart.map((item) => {
            if (item.id == product_id && item.size == size){
                item.amount++;
            }
            return item;
        });
    } 
    else{
        newShopCart = [...shopCart, {id: product_id, amount: 1, size: size}];
    }

    shopCartAmount = document.querySelector('#shopCartAmount');
    shopCartAmount.innerHTML = newShopCart.reduce((acc, item) =>{
        return acc + item.amount;
    }, 0);

    localStorage.setItem("shopCart", JSON.stringify(newShopCart));
    console.log(newShopCart);

}