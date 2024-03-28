
let accountObject = document.getElementById('account');
let ordersObject = document.getElementById('orders');
let ordersButton = document.getElementById('orders_button');
let accountButton = document.getElementById('account_button');

accountButton.addEventListener('click', () => showForm(accountObject, ordersObject, accountButton, ordersButton));
ordersButton.addEventListener('click', () => showForm(ordersObject, accountObject, ordersButton, accountButton));


function showForm(formToShow, formToHide, buttonToShow, buttonToHide) {
    buttonToHide.classList.remove('active');
    buttonToShow.classList.add('active');
    formToShow.classList.add('active');
    formToHide.classList.remove('active');
}