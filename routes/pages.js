const express = require('express');
const { getPopularProducts } = require('../database/productOperations');
const { userCheck } = require('../utils/redirectUnauth');

const router = express.Router();


router.get('/', async function(req, res){
    let responsePopular = await getPopularProducts();

    res.status(200).render('pages/index', {
        settings:{
            title: 'Main page',
            isHeaderWhite: true,
        },
        isAdmin: !!req.session.user?.isAdmin,
        popularProduct: responsePopular
    });
});

router.get('/aboutus', function(req, res){
    res.status(200).render('pages/aboutus', {
        settings:{
            title: 'About us',
            isHeaderWhite: true
        },
        isAdmin: !!req.session.user?.isAdmin,
    });
});


router.get('/shopcart', userCheck, function(req, res){
    res.status(200).render('pages/shopcart', {
        settings:{
            title: 'Shop cart',
            isHeaderWhite: false
        },
        isAdmin: !!req.session.user?.isAdmin,
    });
});


router.get('/contacts', userCheck, function(req, res){
    res.status(200).render('pages/contacts', {
        settings:{
            title: 'Contacts',
            isHeaderWhite: false
        },
        isAdmin: !!req.session.user?.isAdmin,
    });
});


router.get('/account', userCheck, function(req, res){


    res.status(200).render('pages/account', {
        settings:{
            title: 'Account',
            isHeaderWhite: false
        },
        isAdmin: !!req.session.user?.isAdmin,
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

router.get('/exit',  userCheck, function(req, res){
    delete req.session.user;
    res.status(301).redirect('/authorization');
})


module.exports = router;