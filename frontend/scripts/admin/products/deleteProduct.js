window.addEventListener('load', function(e) {
    let deleteButtonBlock = document.querySelector('#deleteFormChange');
    deleteButtonBlock.addEventListener('click', showDeleteProducts);
})

async function showDeleteProducts(event){

    let products = await getAllProducts();

    let parent = document.querySelector('.delete_block .cards');
    parent.innerHTML = '';

    products.forEach(function(product){
        let card = document.createElement('div');
        card.classList.add('card');

        card.innerHTML = `
            <h3 class="title">#${product.id}</h3>
            <p>${product.title}</p>
            <p class="card_price">${product.price.toLocaleString('ru-RU', { style: 'currency', currency: 'RUB', maximumFractionDigits: 0 })}</p>
        `;

        let button = document.createElement('button');
        button.classList.add('button_delete');
        button.innerHTML = 'Удалить';
        button.value = product.id;
        button.addEventListener('click', deleteProduct)

        card.appendChild(button);

        parent.appendChild(card);
    })
}


async function deleteProduct(event) {
    let id = event.target.value;

    let response = await fetch(`/api/products`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id: id
        })
    });

    let result = await response.json();

    console.log(result);

    let popupTitle = result.code == 200 ? 'Успешно': 'Ошибка';
    let popupMessage = result.code == 200 ? `Товар "${result.product.title}" с id = ${result.product.id} успешно удален!`: result.error;

    createPopup(popupTitle, popupMessage)
    await showDeleteProducts();
}