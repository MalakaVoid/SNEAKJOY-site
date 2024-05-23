window.addEventListener('load', function(e) {
    showDeleteOrders()
})

async function showDeleteOrders(event){

    let orders = await getAllOrders();

    let parent = document.querySelector('.one_delete_block .cards');
    parent.innerHTML = '';

    orders.forEach(function(order){
        let card = document.createElement('div');
        card.classList.add('card');

        let cardInner = `
            <h3 class="title">#${order.id}</h3>
            <div class="card__item">
                Цена <div>${order.totalPrice}</div>
            </div>
            <div class="card__item">
                Дата создания <div>${new Date(order.creationDate).toLocaleDateString()}</div>
            </div>
            <div class="card__item">
                Дата доставки <div>${new Date(order.deliveryDate).toLocaleDateString()}</div>
            </div>
            <div class="card__item big">
                Товары 
                <div>
        `;

        order.products.forEach((product) => {
            cardInner += `${product.title} ${product.size}US <span>${product.amount}</span><br>`;
        })

        cardInner += `
                </div>
            </div>
            <div class="card__item">
                Id пользователя <div>${order.userId}</div>
            </div>
        `;

        card.innerHTML = cardInner;

        let button = document.createElement('button');
        button.classList.add('button_delete');
        button.innerHTML = 'Удалить';
        button.value = order.id;
        button.addEventListener('click', deleteOrder)

        card.appendChild(button);

        parent.appendChild(card);
    })
}


async function deleteOrder(event) {
    let id = event.target.value;

    let response = await fetch(`/api/order`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id: id
        })
    });

    let result = await response.json();

    let popupTitle = result.code == 200 ? 'Успешно': 'Ошибка';
    let popupMessage = result.code == 200 ? `Заказ с id = ${result.deletedId} успешно удалена!`: result.error;

    createPopup(popupTitle, popupMessage)
    await showDeleteOrders();
}