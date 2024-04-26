window.onload = ()=>{
    let shopCart = localStorage.getItem('shopCart');
    shopCart = JSON.parse(shopCart);

    shopCartAmount = document.querySelector('#shopCartAmount');
    let count = shopCart.reduce((acc, item) =>{
        return acc + item.amount;
    }, 0);

    if (count == 0) count = '';

    shopCartAmount.innerHTML = count;
}