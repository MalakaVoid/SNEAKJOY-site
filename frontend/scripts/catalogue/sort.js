window.addEventListener('load', async function(e) {

    const products = await getProducts();
    showAllProducts(products);

    let search = document.querySelector('#search');
    search.addEventListener('change', searchProducts);

    let searchButton = document.querySelector('#search_btn');
    searchButton.addEventListener('click', searchProducts);


    function searchProducts(e){
        let searchInput = document.querySelector('#search');
        let searchValue = searchInput.value;;
        
        let searhedProduct = products.filter((item) => item.title.toLowerCase().includes(searchValue.toLowerCase()));
        showAllProducts(searhedProduct);
    }
})


async function getProducts() {
    let response = await fetch('http://localhost:3000/api/products');
    let products = await response.json();
    return products;
}

function showAllProducts(products) {
    document.querySelector('.catalogue_products').innerHTML = '';

    products.forEach(product => {
        let card = document.createElement('div');
        card.classList.add('catalogue_products_card');
        let cardInner = `
            <a href="/product/${product.id}">
                <div class="catalogue_products_card_image">
                    <img src="${product.mainImage}" />
                    <img src="${product.supImage}" />
                </div>
                <div class="catalogue_products_card_title">${product.title}</div>
                <div class="catalogue_products_card_desc">${product.descriptionSmall}</div>
                <div class="catalogue_products_card_price">${product.price.toLocaleString('ru-RU', { style: 'currency', currency: 'RUB', maximumFractionDigits: 0 })}</div>
            </a>
        `;

        cardInner += `<div class="catalogue_products_card_sizes">`;
        for (let i = 0; i < product.sizes.length; i++) {
            cardInner += `
                <span onClick="addProductToCart(${product.id}, ${product.sizes[i]})">
                    ${product.sizes[i]}
                </span>
            `;
            if (i!== product.sizes.length - 1) {
                cardInner += `&nbsp;|&nbsp;`;
            }
        }
        cardInner += `</div></div>`;

        card.innerHTML = cardInner;

        document.querySelector('.catalogue_products').appendChild(card);
    });


}