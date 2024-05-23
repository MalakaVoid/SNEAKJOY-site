const express = require('express');
const {userCheckAdmin} = require('../utils/redirectUnauth');


const router = express.Router();


router.get(['/', '/products'], userCheckAdmin, function (req, res) {
    res.status(200).render('pages/admin/index');
})

router.get('/users', userCheckAdmin, function (req, res) {
    res.status(200).render('pages/admin/users');
})

router.get('/orders', userCheckAdmin, function (req, res) {
    res.status(200).render('pages/admin/orders');
})

router.get('/reviews', userCheckAdmin, function (req, res) {
    res.status(200).render('pages/admin/reviews');
})


module.exports = router;