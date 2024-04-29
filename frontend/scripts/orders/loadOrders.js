window.addEventListener('load', async function(e){
    await loadOrders();
});

async function loadOrders(){

    let user = localStorage.getItem('user');
    user = JSON.parse(user);

    let response = await fetch('/api/order/getordersbyuserid', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            userId: user.id
        })
    })

    let result = await response.json();

    let orders = result.orders;
    console.log(orders);

    let ordersContainer = document.querySelector('#orders');

    for (let i = 0; i < orders.length; i++) {

        let orderContainer = document.createElement('div');
        orderContainer.classList.add('orders_part_card');

        let inner =  `
            <div class="orders_part_card_num">
                #${orders[i].id}
            </div>
            <div class="orders_part_card_items">
                <ul>
            `;
        for (let j = 0; j < orders[i].products.length; j++) {
            inner += `
                <li>${orders[i].products[j].title}, размер: ${orders[i].products[j].size} <span>${orders[i].products[j].amount}</span></li>
            `;
        }

        inner += `
                </ul>
            </div>
            <div class="orders_part_card_dates">
                <div class="orders_part_card_dates_creation">
                    <span>Создан:</span>
                    <span>${new Date(orders[i].creationDate).toLocaleDateString()}</span>
                </div>
                <div class="orders_part_card_dates_delivery">
                    <span>Доставка:</span>
                    <span>${new Date(orders[i].deliveryDate).toLocaleDateString()}</span>
                </div>
            </div>
            <div class="orders_part_card_price">
                ${orders[i].totalPrice.toLocaleString('ru-RU', { style: 'currency', currency: 'RUB', maximumFractionDigits: 0 })}
            </div>
        `;
        orderContainer.innerHTML = inner;
        ordersContainer.appendChild(orderContainer);
    }

}