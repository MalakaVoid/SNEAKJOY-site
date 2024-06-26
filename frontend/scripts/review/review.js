window.addEventListener('load', function(e){
    let reviewForm = document.querySelector('#reviewForm');
    reviewForm.addEventListener('submit', handleReviewFormSubmit);
})

async function handleReviewFormSubmit(e){
    e.preventDefault();
    
    let reviewForm = document.querySelector('#reviewForm');
    let nameField = reviewForm.querySelector('[name="reviewName"]');
    let emailField = reviewForm.querySelector('[name="reviewEmail"]');
    let textField = reviewForm.querySelector('[name="reviewText"]');

    let name = nameField.value;
    let email = emailField.value;
    let text = textField.value;

    if (name.trim() == '' || email.trim() == '' || text.trim() == ''){
        return;
    }

    let sendData = {
        name: name,
        email: email,
        text: text,
    }

    let response = await fetch('/api/reviews/addreview',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(sendData)
    })

    let result = await response.json();

    if (result.code === 501){
        showReviewPopup('Ошибка', 'Произошла ошибка на стороне сервера, попробуйте еще раз!');
        return;
    }

    if (result.code === 301){
        window.location.href = "/authorization";
    }

    showReviewPopup('Заявка принята', 'Спасибо за отзыв, ваш отзыв сохранен.')

    nameField.value = '';
    emailField.value = '';
    textField.value = '';
}