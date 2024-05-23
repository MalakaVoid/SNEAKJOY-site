window.addEventListener('load', function(e) {

    let editButtonBlock = document.querySelector('#editFormChange');
    editButtonBlock.addEventListener('click', showEditUsers);

})

async function showEditUsers(event){

    let users = await getAllUsers();

    let parent = document.querySelector('.edit_block .cards');
    parent.innerHTML = '';

    users.forEach(function(user) {
        let card = document.createElement('div');
        card.classList.add('card');

        card.addEventListener('dblclick', e => {
            let curCard = e.target.closest('.card');
            let inputs = curCard.querySelectorAll('[name]');
            inputs.forEach(function(input) {
                input.disabled = false;
            })
        })

        let cardInner = `
            <h3 class="title">#${user.id}</h3>

            <label class="input_container">
                Email <input type="text" name="email" disabled value="${user.email}" >
            </label>

            <label class="input_container">
                Имя <input type="text" name="name" disabled value="${user.name}" >
            </label>

            <label class="input_container">
                Пароль <input type="text" name="password" disabled value="${user.password}" >
            </label>

            <label class="input_container input_container_checkbox">
                <input type="checkbox" name="is_admin" disabled ${user.isAdmin? 'checked':''}> Админ
            </label>
        `;
        card.innerHTML = cardInner;

        let buttonEdit = document.createElement('button');
        buttonEdit.classList.add('button-edit');
        buttonEdit.innerHTML = 'Редактировать';
        buttonEdit.value = user.id;
        buttonEdit.addEventListener('click', editUser);
        buttonEdit.disabled = true;
        buttonEdit.name = 'id';

        card.appendChild(buttonEdit);

        parent.appendChild(card);

    })
}

function disableCard(card) {
    let inputs = card.querySelectorAll('[name]');
    inputs.forEach(function(input) {
        input.disabled = true;
    })
}


function serializeEditData(card){
    let data = {
        id: null,
        email: null,
        name: null,
        password: null,
        is_admin: false
    };

    let inputs = [...card.querySelectorAll('[name]')];

    let formData = inputs.map(input => {
        return [input.name, input.value == 'on'? input.checked: input.value];
    })

    for ([key, value] of formData){
        
        if (value === ''){
            let input = document.querySelector(`[name='${key}']`);
            input.style.border = '2px solid red';
            return;
        }

        data[key] = value;
        console.log(data[key]);
    }

    return data;
}

function resetInputsEdit(card){
    let inputs = card.querySelectorAll('[name]');

    for (let input of inputs) {
        input.style.border = '1px solid var(--sup-black)';
    }
}


async function editUser(event) {

    let parent = event.target.closest('.card');

    resetInputsEdit(parent);

    let data = serializeEditData(parent) ?? null;

    if (!data) return;

    let response = await fetch(`/api/users`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    let result = await response.json();

    let popupTitle = result.code == 200? 'Успешно': 'Ошибка';
    let popupMessage = result.code == 200? `
    Пользователь  с id = ${result.newUser.id} успешно изменен!<br>
    Email: ${result.oldUser.email} -> ${result.newUser.email}<br>
    Имя: ${result.oldUser.name} -> ${result.newUser.name}<br>
    Пароль: ${result.oldUser.password} -> ${result.newUser.password}<br>
    Админ: ${result.oldUser.isAdmin} -> ${result.newUser.isAdmin}
    `: result.error;

    createPopup(popupTitle, popupMessage)

    result.code == 200 && disableCard(parent)

}

