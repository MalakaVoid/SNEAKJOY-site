const express = require('express');
const { getProductsById, getAllProducts, addProduct, deleteProduct, editProduct } = require('../../database/productOperations');

const router = express.Router();


// 
//  /api/products
// 


router.post('/getproductsbyid', async function(req, res){
    let productIds = req.body.productIds;

    let responseProduct = await getProductsById(productIds);
    
    if (responseProduct.code === 404) {
        res.status(404).json(responseProduct.error);
        return;
    }

    res.status(200).json(responseProduct)
});

router.get('/', async function(req, res){

    let productsResponse = await getAllProducts();

    res.status(200).json(productsResponse)

})

router.post('/', async function(req, res){

    console.log(req.session.user)

    let {
        title,
        price,
        description_small,
        description,
        main_image,
        sup_image,
        sizes,
        visibility,
        is_popular,
    } = req.body;

    let response = await addProduct(
        {
            title: title,
            price: price,
            description_small: description_small,
            description: description,
            main_image: main_image,
            sup_image: sup_image,
            sizes: sizes,
            visibility: visibility,
            is_popular: is_popular,
        }
    )

    res.status(200).json(response);

})

router.delete('/', async function(req, res) {

    let { id } = req.body;

    let response = await deleteProduct(id);

    res.status(200).json(response);

})

router.put('/', async function(req, res) {

    let {
        id,
        title,
        price,
        description_small,
        description,
        main_image,
        sup_image,
        sizes,
        visibility,
        is_popular,
    } = req.body;

    let response = await editProduct(
        {
            id: id,
            title: title,
            price: price,
            description_small: description_small,
            description: description,
            main_image: main_image,
            sup_image: sup_image,
            sizes: sizes,
            visibility: visibility,
            is_popular: is_popular,
        }
    )

    res.status(200).json(response);

})


module.exports = router;