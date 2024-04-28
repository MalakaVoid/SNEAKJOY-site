window.addEventListener('load', function(e){
    let reviewForm = document.querySelector('#reviewForm');
    reviewForm.addEventListener('submit', handleReviewFormSubmit);
})

function handleReviewFormSubmit(e){
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

    // ADD USER WHO SEND IT

    let message = {
        name: name,
        email: email,
        text: text,
    }

    console.log(message);
}