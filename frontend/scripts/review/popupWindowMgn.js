window.addEventListener('load', function(e){

    let popupElement = document.querySelector('.review_popup');
    let popupCloseBtn = popupElement.querySelector('.review_popup__exit');

    popupElement.addEventListener('click', handleAsideClickPopupExit);
    popupCloseBtn.addEventListener('click', hideReviewPopup);

});

function handleAsideClickPopupExit(e){
    if(e.target !== e.currentTarget) return;
    hideReviewPopup();
}

function hideReviewPopup(){
    let popupElement = document.querySelector('.review_popup');
    popupElement.classList.remove('active');
}

function showReviewPopup(title, text){
    let popupElement = document.querySelector('.review_popup');
    popupElement.querySelector('.review_popup__title').innerHTML = title;
    popupElement.querySelector('.review_popup__text').innerHTML = text;
    popupElement.classList.add('active');
}