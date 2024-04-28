const conn = require('./database');
const mysql = require('mysql2/promise');


module.exports.getAllProducts = async function getAllProducts(){
    const connection = await conn.getConnection();
    let [results] = await connection.query("SELECT * FROM products");
    connection.release();
    
    let products = results.map(function(item){
        return {
            id: item.product_id,
            title: item.title,
            price: item.price,
            descriptionSmall: item.description_small,
            description: item.description,
            mainImage: item.main_image,
            supImage: item.sup_image,
            sizes: item.sizes
        }
    })

    return products;
}

module.exports.getProductById = async function getProductById(id){
    const connection = await conn.getConnection();

    let [results] = await connection.query("SELECT * FROM products WHERE product_id =?", [id]);
    connection.release();
    
    if (results.length === 0){
        return {
            code: 404
        }
    }

    let product = {
        id: results[0].product_id,
        title: results[0].title,
        price: results[0].price,
        descriptionSmall: results[0].description_small,
        description: results[0].description,
        mainImage: results[0].main_image,
        supImage: results[0].sup_image,
        sizes: results[0].sizes
    }

    return {
        code: 200,
        product: product
    };
}

module.exports.getPopularProducts = async function getPopularProducts(){
    const connection = await conn.getConnection();
    let [results] = await connection.query("SELECT * FROM products WHERE is_popular=1");
    connection.release();
    if (results.length >= 4){
        let products = results.map(function(item){
            return {
                id: item.product_id,
                title: item.title,
                price: item.price,
                descriptionSmall: item.description_small,
                description: item.description,
                mainImage: item.main_image,
                supImage: item.sup_image,
                sizes: item.sizes
            }
        })
    
        return products;
    } else{
        console.log('Error finding 4 popular products')
        return 'error';
    }
}

module.exports.getProductsById = async function getProductsById(productIds){
    const connection = await conn.getConnection();
    let query = "SELECT * FROM products WHERE ";
    for (let i = 0; i < productIds.length; i++) {

        query += "product_id = " + productIds[i];

        if (i !== productIds.length - 1){
            query = query + " OR ";
        }

    }
    let results = [];
    try{
        [results] = await connection.query(query);
    } catch (err) {
        return {
            code: 501, 
            error: err.message
        };
    }
    connection.release();
    
    let products = results.map(function(item){
        return {
            id: item.product_id,
            title: item.title,
            price: item.price,
            mainImage: item.main_image,
            supImage: item.sup_image,
        }
    })

    return products;
}