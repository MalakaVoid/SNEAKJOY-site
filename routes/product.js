const express = require('express');
const { getProductById, getPopularProducts } = require('../database/productOperations');
const { userCheck } = require('../utils/redirectUnauth');

const router = express.Router();


router.get('/:id', userCheck, async function(req, res){
    
    let productId = req.params.id;

    let responseProduct = await getProductById(productId);
    let responsePopular = await getPopularProducts();

    if (responseProduct.code === 404) {
        res.status(404).render('pages/404', {
            settings:{
                title: 'Error',
                isHeaderWhite: false
            },
            isAdmin: !!req.session.user?.isAdmin,
        });
        return;
    }

    res.status(200).render('pages/productcard', {
        settings:{
            title: 'Product Card',
            isHeaderWhite: false
        },
        isAdmin: !!req.session.user?.isAdmin,
        product: responseProduct.product,
        popularProduct: responsePopular
    });
});


module.exports = router;