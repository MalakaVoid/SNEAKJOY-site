window.addEventListener('load', async function(e){
    // let userInfo = localStorage.getItem('user');
    // userInfo = JSON.parse(userInfo);

    // let user = await getUserData(userInfo.id);
    let user = await getUserData();

    let nameField = document.querySelector('[name="accName"]');
    let emailField = document.querySelector('[name="accEmail"]');

    nameField.value = user.name;
    emailField.value = user.email;
});

async function getUserData(){
    let response = await fetch('/api/auth/getuserbyid', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    })

    let result = await response.json();
    if (result.code !== 200) {
        return {
            id: '',
            name: '',
            email: '',
            isAdmin: '',
        }
    }

    return result.user;
}