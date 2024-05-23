async function getAllReviews() {

    let response = await fetch('/api/reviews');
    let reviews = await response.json();
    return reviews.reviews;

}