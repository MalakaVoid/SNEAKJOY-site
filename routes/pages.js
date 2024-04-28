const express = require('express');
const { getPopularProducts } = require('../database/productOperations');

const router = express.Router();


router.get('/', async function(req, res){
    
    let responsePopular = await getPopularProducts();

    res.status(200).render('pages/index', {
        settings:{
            title: 'Main page',
            isHeaderWhite: true
        },
        popularProduct: responsePopular
    });
});

router.get('/aboutus', function(req, res){
    res.status(200).render('pages/aboutus', {
        settings:{
            title: 'About us',
            isHeaderWhite: true
        }
    });
});


router.get('/shopcart', function(req, res){
    res.status(200).render('pages/shopcart', {
        settings:{
            title: 'Shop cart',
            isHeaderWhite: false
        }
    });
});


router.get('/contacts', function(req, res){
    res.status(200).render('pages/contacts', {
        settings:{
            title: 'Contacts',
            isHeaderWhite: false
        }
    });
});


router.get('/account', function(req, res){
    res.status(200).render('pages/account', {
        settings:{
            title: 'Account',
            isHeaderWhite: false
        }
    });
});


router.get('/authorization', function(req, res){
    res.status(200).render('pages/authorization', {
        settings:{
            title: 'Account',
            isHeaderWhite: false
        }
    });
});


module.exports = router;