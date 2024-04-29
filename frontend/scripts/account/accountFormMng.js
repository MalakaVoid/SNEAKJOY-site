window.addEventListener('load', async function(e){

    let accountForm = document.querySelector('#account_part_form');
    let accountButtonSave = accountForm.querySelector('.account_part_form_button_save');
    let accountButtonExit = accountForm.querySelector('.account_part_form_button_exit');

    accountButtonSave.addEventListener('click', changeUserData);
    accountButtonExit.addEventListener('click', exitAccount);

});

function exitAccount(){
    localStorage.clear();
    location.reload();
}

async function changeUserData(event){
    let errorContainer = document.querySelector('#accError');
    errorContainer.innerHTML = '';

    let userInfo = localStorage.getItem('user');
    userInfo = JSON.parse(userInfo)

    let accountForm = document.querySelector('#account_part_form');

    let email = accountForm.querySelector('[name="accEmail"]').value;
    let name = accountForm.querySelector('[name="accName"]').value;
    let password = accountForm.querySelector('[name="accPassword"]').value;
    let confirmPassword = accountForm.querySelector('[name="accPasswordAgain"]').value;

    let check = checkInputData(email, name, password, confirmPassword);
    if (check.code === 404){
        handleError(check);
        return;
    }

    let user = await getUserData(userInfo.id);
    let edditedUser = {};

    if (email!== user.email){
        edditedUser.email = email;
    } else{
        edditedUser.email = user.email;
    }

    if (name!== user.name){
        edditedUser.name = name;
    } else{
        edditedUser.name = user.name;
    }

    edditedUser.id = user.id;
    edditedUser.password = password;
    edditedUser.isAdmin = user.isAdmin;

    let response = await fetch('/api/auth/edituser',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(edditedUser)
    })

    let result = await response.json();
    
    if (result.code === 501){
        handleError(result);
        return;
    }

    accountForm.querySelector('[name="accEmail"]').value = result.user.email;
    accountForm.querySelector('[name="accName"]').value = result.user.name;
    accountForm.querySelector('[name="accPassword"]').value = '';
    accountForm.querySelector('[name="accPasswordAgain"]').value = '';

}

function checkInputData(email, name, password, confirmPassword) {
    if (password !== confirmPassword) {
        return {
            code: 404,
            message: 'Пароли не совпадают'
        };
    }

    if (email.trim() == '' || name.trim() == '') {
        return {
            code: 404,
            message: 'Заполните поля'
        };
    }

    return {
        code: 200
    };
}

function handleError(message){
    let errorContainer = document.querySelector('#accError');
    if (message.code == 501){
        errorContainer.innerHTML = 'Произошла ошибка на стороне сервера, попробуйте еще раз';
        return;
    }

    errorContainer.innerHTML = message.message;
}