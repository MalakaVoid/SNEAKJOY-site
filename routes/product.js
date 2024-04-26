const express = require('express');
const { getProductById, getPopularProducts } = require('../database/product_operations');

const router = express.Router();


router.get('/:id', async function(req, res){
    let productId = req.params.id;

    let responseProduct = await getProductById(productId);
    let responsePopular = await getPopularProducts();

    if (responseProduct.code === 404) {
        res.status(404).render('pages/404', {
            settings:{
                title: 'Error',
                isHeaderWhite: false
            }
        });
        return;
    }

    res.status(200).render('pages/productcard', {
        settings:{
            title: 'Product Card',
            isHeaderWhite: false
        },
        product: responseProduct.product,
        popularProduct: responsePopular
    });
});


module.exports = router;