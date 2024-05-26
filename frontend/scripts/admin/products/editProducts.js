window.addEventListener('load', function(e) {

    let editButtonBlock = document.querySelector('#editFormChange');
    editButtonBlock.addEventListener('click', showEditProducts);

})

async function showEditProducts(event){

    let products = await getAllProducts();

    let parent = document.querySelector('.edit_block .cards');
    parent.innerHTML = '';

    products.forEach(function(product) {
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
        <h3 class="title">#${product.id}</h3>

        <label class="input_container">
            Название <input type="text" name="title" value="${product.title}" disabled>
        </label>
        
        <label class="input_container">
            Цена <input type="number" name="price" value="${product.price}" disabled>
        </label>
        
        <label class="input_container">
            Описание (мал.) <textarea name="description_small" disabled >${product.descriptionSmall}</textarea>
        </label>
        
        <label class="input_container">
            Описание (бол.) <textarea name="description" disabled >${product.description}</textarea>
        </label>
        
        <label class="input_container">
            Осн. картинка <input type="text" name="main_image" value="${product.mainImage}" disabled>
        </label>
        
        <label class="input_container">
            Доп. картинка<input type="text" name="sup_image" value="${product.supImage}" disabled>
        </label>
        
        <label class="input_container input_container__select" >
            Выберите размеры:
            <select name="sizes" multiple disabled>
        `;

        for (let i =37; i <= 43; i++){
            if (product.sizes.includes(i)){
                cardInner += `<option value="${i}" selected>${i}</option>`;
            } else{
                cardInner += `<option value="${i}">${i}</option>`;
            }
        }

        cardInner += `
            </select>
        </label>
        
        <label class="input_container input_container_checkbox">
            <input type="checkbox" name="visibility" disabled ${product.visibility? 'checked':''}> Видимость
        </label>
        
        <label class="input_container input_container_checkbox">
            <input type="checkbox" name="is_popular" disabled ${product.is_popular? 'checked':''}> Популярное
        </label>
        `;
        card.innerHTML = cardInner;

        let buttonEdit = document.createElement('button');
        buttonEdit.classList.add('button-edit');
        buttonEdit.innerHTML = 'Редактировать';
        buttonEdit.value = product.id;
        buttonEdit.addEventListener('click', editProduct);
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
        title: null,
        price: null,
        description_small: null,
        description: null,
        main_image: null,
        sup_image: null,
        sizes: [],
        visibility: false,
        is_popular: false,
    };

    let inputs = [...card.querySelectorAll('[name]')];

    let formData = inputs.map(input => {
        if (input.name == 'sizes'){
            let selected = [...input.selectedOptions].map(opt => opt.value);
            console.log(selected)
            return ['sizes' , selected];
        }
        return [input.name, input.value == 'on'? input.checked:input.value];
    })

    for ([key, value] of formData){
        
        if (value === ''){
            let input = card.querySelector(`[name='${key}']`);
            input.style.border = '2px solid red';
            return;
        }

        data[key] = value == 'on' ? true : value;
    }

    return data;
}

function resetInputsEdit(card){
    let inputs = card.querySelectorAll('[name]');

    for (let input of inputs) {
        input.style.border = '1px solid var(--sup-black)';
    }
}


async function editProduct(event) {

    let parent = event.target.closest('.card');

    resetInputsEdit(parent);

    let data = serializeEditData(parent) ?? null;

    if (!data) return;

    let response = await fetch(`/api/products`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    let result = await response.json();

    let popupTitle = result.code == 200? 'Успешно': 'Ошибка';
    let popupMessage = result.code == 200? `
        Товар с id = ${result.newProduct.id} успешно изменен!<br>
        <span>Название:</span> ${result.oldProduct.title} <span>-></span> ${result.newProduct.title}<br>
        <span>Цена:</span> ${result.oldProduct.price} <span>-></span> ${result.newProduct.price}<br>
        <span>Описание(мал.):</span> ${result.oldProduct.descriptionSmall} <span>-></span> ${result.newProduct.description_small}<br>
        <span>Описание(бол.):</span>${result.oldProduct.description} <span>-></span> ${result.newProduct.description}<br>
        <span>Осн. картинка:</span> ${result.oldProduct.mainImage} <span>-></span> ${result.newProduct.main_image}<br>
        <span>Доп. картинка:</span> ${result.oldProduct.supImage} <span>-></span> ${result.newProduct.sup_image}<br>
        <span>Размеры:</span> ${result.oldProduct.sizes} <span>-></span> ${result.newProduct.sizes}<br>
        <span>Видимость:</span> ${result.oldProduct.visibility} <span>-></span> ${result.newProduct.visibility}<br>
        <span>Популярное:</span> ${result.oldProduct.is_popular} <span>-></span> ${result.newProduct.is_popular}

        `
        : result.error;

    createPopup(popupTitle, popupMessage, true)

    result.code == 200 && disableCard(parent)

}

