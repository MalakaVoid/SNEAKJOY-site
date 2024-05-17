const express = require('express');
const path = require('path');
const ejs = require('ejs');
const pagesRouter = require('./routes/pages');
const productRouter = require('./routes/product');
const catalogueRouter = require('./routes/catalogue');
const apiProductsRouter = require('./routes/apiProducts');
const apiAuthRouter = require('./routes/auth');
const apiReviewsRouter = require('./routes/reviews');
const apiOrderRouter = require('./routes/order');
const mysql = require('mysql2');
const bodyParser = require('body-parser')
const session = require('express-session')
const redis = require('redis')
const connectRedis = require('connect-redis');
const cookieParser = require('cookie-parser');

const redisStorage = connectRedis.default;

const app = express();
const redisClient = redis.createClient();
redisClient.connect()

app.set('view engine', 'ejs')
app.set('views', __dirname + '/views');
app.use('/',express.static(path.join(__dirname, 'frontend')));
// app.use("/public", express.static(__dirname + "/frontend"));

app.use( bodyParser.json() );
app.use(bodyParser.urlencoded({
  extended: true
})); 

// SESSION 
app.use(cookieParser('qwerty'));
app.use(
    session({
        store: new redisStorage({
            host: 'localhost',
            port: 6379,
            client: redisClient,
            ttl: 3600000,
        }),
        secret: 'qwerty',
        saveUninitialized: true,
    })
);

// ---------

app.use('/', pagesRouter);
app.use('/product', productRouter);
app.use('/catalogue', catalogueRouter);
app.use('/api/products', apiProductsRouter);
app.use('/api/auth', apiAuthRouter);
app.use('/api/reviews', apiReviewsRouter);
app.use('/api/order', apiOrderRouter);


app.use(function(req, res, next){
    console.log(req.originalUrl);
    console.log('SESSION USER')
    console.log(req.session.user);
    next();
});


app.all('*', (req, res) => { 
    res.status(404).render('pages/404', {
        settings:{
            title: 'Error',
            isHeaderWhite: false
        },
        isAdmin: !!req.session.user?.isAdmin,
    });
}); 


// START SERVER
app.listen(3000, function(){
    console.log(`[x] SITE IS RUNNING [x]`);
});