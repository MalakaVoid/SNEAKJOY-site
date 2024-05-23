const express = require('express');
const { makeOrder, getOrderByUserId, getOrders, deleteOrder } = require('../../database/orderOperations');
const { getProductsById } = require('../../database/productOperations');

const router = express.Router();

router.post('/makeorder', async function(req, res){

    let userId = req.session.user.id;
    let userProducts = req.body.products;

    let productIds = userProducts.map(product => product.id);
    let responseProducts = [...new Set(await getProductsById(productIds))];

    let totalPrice = 0;

    let products = userProducts.map(product => {
        itemPrice = responseProducts.filter(item => item.id === product.id)[0].price;
        totalPrice += product.amount * itemPrice;
        return {
            ...product,
            price: itemPrice,
        }
    })
    
    let response = await makeOrder(userId, products,  totalPrice)
    if (response.code === 501) {
        res.status(501).json({
            code: 501,
        });
        return;
    }

    res.status(200).json({
        code: 200,
    })

});

router.post('/getordersbyuserid', async function(req, res){

    let userId = req.session.user.id;

    let responseOrders = await getOrderByUserId(userId);

    res.status(200).json({
        code: 200,
        orders: responseOrders.orders,
    })

});


router.get('/', async function (req, res) {

    let response = await getOrders();

    res.status(200).json(response)

})

router.delete('/', async function (req, res) {

    let { id } = req.body;

    let response = await deleteOrder(id);

    res.status(200).json(response)

})

module.exports = router;