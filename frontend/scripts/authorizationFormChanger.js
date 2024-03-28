
let authorizationForm = document.getElementById('authorization_form');
let registrationForm = document.getElementById('registration_form');

let authorizationButton = document.getElementById('authorization_button');
let registrationButton = document.getElementById('registration_button');

authorizationButton.addEventListener('click', showAuthorizationForm);
registrationButton.addEventListener('click', showRegistrationForm);
authorizationButton.addEventListener('keyup', function(event) {event.key == 'Enter' && this.click();});
registrationButton.addEventListener('keyup', function(event) {event.key == 'Enter' && this.click();});


function showRegistrationForm() {
    authorizationButton.classList.remove('active');
    registrationButton.classList.add('active');
    registrationForm.classList.add('active');
    authorizationForm.classList.remove('active');
}

function showAuthorizationForm() {
    registrationButton.classList.remove('active');
    authorizationButton.classList.add('active');
    registrationForm.classList.remove('active');
    authorizationForm.classList.add('active');
}