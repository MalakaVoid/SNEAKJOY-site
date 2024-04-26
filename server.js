const express = require('express');
const path = require('path');
const ejs = require('ejs');
const pagesRouter = require('./routes/pages');
const productRouter = require('./routes/product');
const catalogueRouter = require('./routes/catalogue');
const mysql = require('mysql2');


const app = express();
app.set('view engine', 'ejs')
app.set('views', __dirname + '/views');
app.use('/',express.static(path.join(__dirname, 'frontend')));
// app.use("/public", express.static(__dirname + "/frontend"));

app.use('/', pagesRouter);
app.use('/product', productRouter);
app.use('/catalogue', catalogueRouter);


app.use(function(req, res, next){
    console.log(req.originalUrl);
    next();
});


app.all('*', (req, res) => { 
    res.status(404).render('pages/404', {
        settings:{
            title: 'Error',
            isHeaderWhite: false
        }
    });
}); 


// START SERVER
app.listen(3000, function(){
    console.log(`[x] SITE IS RUNNING [x]`);
});