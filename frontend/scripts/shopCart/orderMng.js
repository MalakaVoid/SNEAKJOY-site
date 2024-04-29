window.addEventListener('load', function(e) {
    let makeOrderButton = document.querySelector('#makeOrder');
    makeOrderButton.addEventListener('click', makeOrder);
});

async function makeOrder(event) {
    let user = localStorage.getItem('user');
    user = JSON.parse(user);
    let shopCart = localStorage.getItem('shopCart');
    shopCart = JSON.parse(shopCart);

    let sendData = {
        userId: user.id,
        products: shopCart
    }

    let response = await fetch('/api/order/makeorder', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(sendData)
    })

    let result = await response.json();

    if (result.code === 501){
        let errorContainer = document.querySelector('#conclusionError');
        errorContainer.innerHTML = 'Произошла ошибка на стороне сервера, попробуйте еще раз';
        return;
    }

    localStorage.removeItem('shopCart');
    window.location.href = "/account";

}