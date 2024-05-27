const express = require('express');
const { getAllProducts } = require('../database/productOperations');
const { userCheck } = require('../utils/redirectUnauth');

const router = express.Router();
router.get('/', userCheck, async function(req, res){
    let data = await getAllProducts();

    res.status(200).render('pages/catalogue', {
        settings:{
            title: 'Catalogue',
            isHeaderWhite: false
        },
        isAdmin: !!req.session.user?.isAdmin,
        products: data

    });
});

module.exports = router;