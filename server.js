const express = require('express');
const path = require('path');
const ejs = require('ejs');


const app = express();
app.set('view engine', 'ejs')
app.set('views', __dirname + '/views');
app.use(express.static(path.join(__dirname, 'frontend')));
// app.use("/public", express.static(__dirname + "/frontend"));


app.use(function(req, res, next){
    console.log(req.originalUrl);
    next();
});


app.get('/', function(req, res){
    res.status(200).render('pages/index', {
        settings:{
            title: 'Main page',
            isHeaderWhite: true
        }
    });
});


app.get('/aboutus', function(req, res){
    res.status(200).render('pages/aboutus', {
        settings:{
            title: 'About us',
            isHeaderWhite: true
        }
    });
});


app.get('/catalogue', function(req, res){
    res.status(200).render('pages/catalogue', {
        settings:{
            title: 'Catalogue',
            isHeaderWhite: false
        }
    });
});


app.get('/shopcart', function(req, res){
    res.status(200).render('pages/shopcart', {
        settings:{
            title: 'Shop cart',
            isHeaderWhite: false
        }
    });
});


app.get('/contacts', function(req, res){
    res.status(200).render('pages/contacts', {
        settings:{
            title: 'Contacts',
            isHeaderWhite: false
        }
    });
});

app.get('/productcard', function(req, res){
    res.status(200).render('pages/productcard', {
        settings:{
            title: 'Product Card',
            isHeaderWhite: false
        }
    });
});


app.get('/account', function(req, res){
    res.status(200).render('pages/account', {
        settings:{
            title: 'Account',
            isHeaderWhite: false
        }
    });
});


app.get('/authorization', function(req, res){
    res.status(200).render('pages/authorization', {
        settings:{
            title: 'Account',
            isHeaderWhite: false
        }
    });
});


// START SERVER
app.listen(3000, function(){
    console.log(`[x] SITE IS RUNNING [x]`);
});