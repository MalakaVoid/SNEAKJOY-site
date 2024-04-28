window.addEventListener('load', function(){
    let authorizationForm = document.querySelector('#authorization_form');
    let registrationForm = document.querySelector('#registration_form');

    let inputs  = document.querySelectorAll('[name]');

    inputs.forEach((input) => {
        input.addEventListener('keyup', onInputChange);
        input.addEventListener('change', onInputChange);
    })

    authorizationForm.addEventListener('submit', onAuthFormSubmit);
    registrationForm.addEventListener('submit', onRegFormSubmit);
});

function onInputChange(e){
    let inputContainer = e.target.parentElement;
    inputContainer.classList.remove('error');

    let form = e.target.closest('form');
    let button = form.querySelector('button');
    let inputs = form.querySelectorAll('[name]');

    let isInputsEntered = true;

    for (let input of inputs) {
        if (input.value.trim() == '') {
            isInputsEntered = false;
            break;
        }
    }

    if (isInputsEntered) {
        button.disabled = false;
    } else{
        button.disabled = true;
    }
}

async function onAuthFormSubmit(event){
    event.preventDefault();

    let email = event.target.querySelector('[name="authEmail"]').value;
    let password = event.target.querySelector('[name="authPassword"]').value;

    let response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: email,
            password: password})
    });

    let result = await response.json();

    if (result.code === 404) {
        errorHandling(result);
        return;
    }

    localStorage.setItem('user', JSON.stringify({
        id: result.user.id,
        isAdmin: result.user.isAdmin
    }));
    
    window.location.replace("/account");
}

async function onRegFormSubmit(event){
    event.preventDefault();

    let email = event.target.querySelector('[name="regEmail"]').value;
    let name = event.target.querySelector('[name="regName"]').value;
    let password = event.target.querySelector('[name="regPassword"]').value;
    let password2 = event.target.querySelector('[name="regPasswordAgain"]').value;

    if (password !== password2) {
        let passwordField = event.target.querySelector('[name="regPassword"]');
        let passwordField2 = event.target.querySelector('[name="regPasswordAgain"]');

        let passwordCont = passwordField.parentElement;
        let passwordCont2 = passwordField2.parentElement;

        console.log(passwordCont);

        passwordCont.classList.add('error');
        passwordCont2.classList.add('error');
        return;
    }

    let response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: email,
            name: name,
            password: password,
        })
    });

    let result = await response.json();

    if (result.code === 404) {
        errorHandling(result);
        return;
    }
    
    localStorage.setItem('user', JSON.stringify({
        id: result.user.id,
        isAdmin: result.user.isAdmin
    }));
    
    window.location.replace("/account");

}

function errorHandling(error){
    let errorContainer = document.querySelector('#error_message');

    if (error.code === 501){
        errorContainer.innerHTML = 'Произошла ошибка на стороне сервера, попробуйте еще раз'
    } else{
        errorContainer.innerHTML = error.message;
    }
}