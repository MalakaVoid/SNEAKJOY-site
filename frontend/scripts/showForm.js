export function showForm(formToShow, formToHide, buttonToShow, buttonToHide) {
    buttonToHide.classList.remove('active');
    buttonToShow.classList.add('active');
    formToShow.classList.add('active');
    formToHide.classList.remove('active');
}