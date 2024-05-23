window.addEventListener('load', function(e) {
    let deleteButtonBlock = document.querySelector('#deleteFormChange');
    deleteButtonBlock.addEventListener('click', showDeleteUsers);
})

async function showDeleteUsers(event){

    let users = await getAllUsers();

    console.log(users);

    let parent = document.querySelector('.delete_block .cards');
    parent.innerHTML = '';

    users.forEach(function(user){
        let card = document.createElement('div');
        card.classList.add('card');

        card.innerHTML = `
            <h3 class="title">#${user.id}</h3>
            <p class="card_price">${user.email}</p>
            <p>${user.name}</p>
        `;

        let button = document.createElement('button');
        button.classList.add('button_delete');
        button.innerHTML = 'Удалить';
        button.value = user.id;
        button.addEventListener('click', deleteUser)

        card.appendChild(button);

        parent.appendChild(card);
    })
}


async function deleteUser(event) {
    let id = event.target.value;

    let response = await fetch(`/api/users`, {
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
    let popupMessage = result.code == 200 ? `Пользователь "${result.user.email}" с id = ${result.user.id} успешно удален!`: result.error;

    createPopup(popupTitle, popupMessage)
    await showDeleteUsers();
}