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
            sizes: item.sizes,
            visibility: !!item.visibility,
            is_popular: !!item.is_popular,
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

module.exports.getProductNameById = async function getProductNameById(id){
    const connection = await conn.getConnection();

    let [results] = await connection.query("SELECT title FROM products WHERE product_id =?", [id]);
    connection.release();

    let product = {
        title: results[0].title,
    }

    return product;
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


module.exports.addProduct = async function addProduct(productInfo){
    const connection = await conn.getConnection();
    let query = "INSERT INTO `products` (`product_id`, `title`, `price`, `description_small`, `description`, `main_image`, `sup_image`, `sizes`, `visibility`, `is_popular`) VALUES (NULL, ?, ?, ?, ?, ?, ?, ?, ?, ?);";

    try{

        [results] = await connection.query(query, [
            productInfo.title,
            productInfo.price,
            productInfo.description_small,
            productInfo.description,
            productInfo.main_image,
            productInfo.sup_image,
            `[${productInfo.sizes.toString()}]`,
            productInfo.visibility ? 1 : 0,
            productInfo.is_popular ? 1 : 0
        ]);

        connection.release();

    } catch(err){
        return {
            code: 501,
            error: err.message
        }
    }

    return {
        code: 200,
        productId: results.insertId,
    }

}

module.exports.deleteProduct = async function deleteProduct(productId){
    const connection = await conn.getConnection();
    let findQuery = "SELECT * FROM products WHERE product_id = ?";
    let deleteQuery = "DELETE FROM products WHERE product_id = ?";
    let products;

    try{

        [products] = await connection.query(findQuery, [productId]);

        await connection.query(deleteQuery, [productId]);

        connection.release();

    } catch(err){
        return {
            code: 501,
            error: err.message
        }
    }

    return {
        code: 200,
        product: {
            id: products[0].product_id,
            title: products[0].title,
            price: products[0].price,
            descriptionSmall: products[0].description_small,
            description: products[0].description,
            mainImage: products[0].main_image,
            supImage: products[0].sup_image,
            sizes: products[0].sizes,
            visibility: !!products[0].visibility,
            is_popular: !!products[0].is_popular,
        }
    }
}

module.exports.editProduct = async function editProduct(productInfo){
    const connection = await conn.getConnection();
    let findQuery = "SELECT * FROM products WHERE product_id = ?";
    let editQuery = "UPDATE `products` SET `title` = ?, `price` = ?, `description_small` = ?, `description` = ?, `main_image` = ?, `sup_image` = ?, `sizes` = ?, `visibility` = ?, `is_popular` = ? WHERE `products`.`product_id` = ?;";
    let products;

    try{

        [products] = await connection.query(findQuery, [productInfo.id]);

        await connection.query(editQuery, [
            productInfo.title,
            productInfo.price,
            productInfo.description_small,
            productInfo.description,
            productInfo.main_image,
            productInfo.sup_image,
            `[${productInfo.sizes.toString()}]`,
            productInfo.visibility? 1 : 0,
            productInfo.is_popular? 1 : 0,
            productInfo.id,
        ]);

        connection.release();

    } catch(err){
        return {
            code: 501,
            error: err.message
        }
    }

    return {
        code: 200,
        oldProduct: {
            id: products[0].product_id,
            title: products[0].title,
            price: products[0].price,
            descriptionSmall: products[0].description_small,
            description: products[0].description,
            mainImage: products[0].main_image,
            supImage: products[0].sup_image,
            sizes: products[0].sizes,
            visibility: !!products[0].visibility,
            is_popular: !!products[0].is_popular,
        },
        newProduct: productInfo
    }


}