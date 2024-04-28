window.addEventListener('load', function(e){
    changeHeaderCartCounter();
})

function changeHeaderCartCounter(){
    let shopCart = localStorage.getItem('shopCart');
    shopCart = JSON.parse(shopCart);
    let count = 0;
    
    if (shopCart == null){
        shopCartAmount = document.querySelector('#shopCartAmount');
        shopCartAmount.innerHTML = '';
    } else{
        count = shopCart.reduce((acc, item) =>{
            return acc + item.amount;
        }, 0);
        
        if (count == 0) count = '';
        
        shopCartAmount = document.querySelector('#shopCartAmount');
        shopCartAmount.innerHTML = count;
    }

    // console.log(shopCart);
}