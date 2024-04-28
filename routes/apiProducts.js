const express = require('express');
const { getProductsById } = require('../database/productOperations');

const router = express.Router();

router.post('/getproductsbyid', async function(req, res){
    let productIds = req.body.productIds;

    let responseProduct = await getProductsById(productIds);
    
    if (responseProduct.code === 404) {
        res.status(404).json(responseProduct.error);
        return;
    }

    res.status(200).json(responseProduct)
});


module.exports = router;