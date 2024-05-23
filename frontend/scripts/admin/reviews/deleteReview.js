window.addEventListener('load', function(e) {
    showDeleteReviews()
})

async function showDeleteReviews(event){

    let reviews = await getAllReviews();

    let parent = document.querySelector('.one_delete_block .cards');
    parent.innerHTML = '';

    reviews.forEach(function(review){
        let card = document.createElement('div');
        card.classList.add('card');

        card.innerHTML = `
            <h3 class="title">#${review.review_id}</h3>
            <div class="card__item">
                Email <div>${review.email}</div>
            </div>
            <div class="card__item">
                Имя <div>${review.name}</div>
            </div>
            <div class="card__item big">
                Отзыв <div>${review.text}</div>
            </div>
        `;

        let button = document.createElement('button');
        button.classList.add('button_delete');
        button.innerHTML = 'Удалить';
        button.value = review.review_id;
        button.addEventListener('click', deleteReview)

        card.appendChild(button);

        parent.appendChild(card);
    })
}


async function deleteReview(event) {
    let id = event.target.value;

    let response = await fetch(`/api/reviews`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id: id
        })
    });

    let result = await response.json();

    let popupTitle = result.code == 200 ? 'Успешно': 'Ошибка';
    let popupMessage = result.code == 200 ? `Заявка с id = ${result.deletedId} успешно удалена!`: result.error;

    createPopup(popupTitle, popupMessage)
    await showDeleteReviews();
}