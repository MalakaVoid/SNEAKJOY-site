window.addEventListener('load', function(e) {

    let addForm = document.querySelector('.add_block form');
    let addButton = addForm.querySelector('.button_add');

    addForm.addEventListener('submit', addProduct);


});

function clearInputs(form){
    let inputs = form.querySelectorAll('[name]');

    for (let input of inputs) {
        if (input.checked) {
            input.checked = false;
        }else{
            input.value = '';
        }
    }
}

function resetInputs(form){
    let inputs = form.querySelectorAll('[name]');

    for (let input of inputs) {
        input.style.border = '1px solid black';
    }
}

function serializeData(formData){
    let data = {
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


    for ([key, value] of formData){
        
        if (value == ''){
            let input = document.querySelector(`[name='${key}']`);
            input.style.border = '2px solid red';
            return;
        }

        if (key == 'sizes'){
            data[key].push(value);
            continue;
        }

        data[key] = value == 'on' ? true : value;
    }

    return data;
}


async function addProduct(event) {

    event.preventDefault();
    resetInputs(event.target);
    let formData = new FormData(event.target);

    let data = serializeData(formData) ?? null;
    if (!data) return;

    let response = await fetch('/api/products/',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }
    )

    let result = await response.json();
    
    let popupTitle = result.code == 200 ? 'Успешно': 'Ошибка';
    let popupMessage = result.code == 200 ? `Товар с id = ${result.productId} успешно добавлен!`: result.error;

    result.code == 200 && clearInputs(event.target);

    createPopup(popupTitle, popupMessage);

}