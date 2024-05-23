async function getAllProducts() {

    let response = await fetch('/api/products');
    let products = await response.json();
    return products;

}