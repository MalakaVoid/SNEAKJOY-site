const conn = require('./database');
const mysql = require('mysql2/promise');
const { getProductNameById } = require('./productOperations');


module.exports.makeOrder = async function makeOrder(userId, products, totalPrice){
    const connection = await conn.getConnection();

    let currentDate = new Date(); // format 2024-04-10
    let deliveryDate = new Date();
    deliveryDate.setDate(currentDate.getDate() + 3);
    let currentDateStr = currentDate.toISOString().split('T')[0];
    let deliveryDateStr = deliveryDate.toISOString().split('T')[0];

    try {
        await connection.beginTransaction()
        
        let results = [];
        [results] = await connection.query(`INSERT INTO orders (order_id, user_id, total_price, creation_date, delivery_date) VALUES (NULL, '${userId}', '${totalPrice}', '${currentDateStr}', '${deliveryDateStr}');`);
        let insertedId = results.insertId;

        for (let i = 0; i < products.length; i++){
            await connection.query(`INSERT INTO order_items (order_id, product_id, size, amount, price) VALUES ('${insertedId}', '${products[i].id}', '${products[i].size}', '${products[i].amount}', '${products[i].price}')`);
        }

        await connection.commit()
        // await connection.end()
        connection.release();
        return {
            code: 200
        }
    } catch (err) {
        await connection.rollback()
        // await connection.end()
        connection.release();
        return {
            code: 501,
            error: err.message
        }
    }
}


module.exports.getOrderByUserId = async function getOrderByUserId(userId){
    const connection = await conn.getConnection();
    let [results] = await connection.query(`SELECT * FROM orders WHERE user_id = ${userId}`);
    
    let orders = [];

    for (let i = 0; i < results.length; i++) {
        let order = {
            id: results[i].order_id,
            userId: results[i].user_id,
            totalPrice: results[i].total_price,
            creationDate: results[i].creation_date,
            deliveryDate: results[i].delivery_date,
            products: []
        }
    
        let [result] = await connection.query(`SELECT * FROM order_items WHERE order_id = ${order.id}`);
        for (product of result){
            let title = await getProductNameById(product.product_id);
            order.products.push({
                id: product.product_id,
                size: product.size,
                amount: product.amount,
                title: title.title,
            })
        }

        orders.push(order);
    }
    connection.release();
    return {
        code: 200,
        orders: orders
    };
}

module.exports.getOrders = async function getOrders(){
    const connection = await conn.getConnection();
    let [results] = await connection.query(`SELECT * FROM orders`);
    
    let orders = [];

    for (let i = 0; i < results.length; i++) {
        let order = {
            id: results[i].order_id,
            userId: results[i].user_id,
            totalPrice: results[i].total_price,
            creationDate: results[i].creation_date,
            deliveryDate: results[i].delivery_date,
            products: []
        }
    
        let [result] = await connection.query(`SELECT * FROM order_items WHERE order_id = ${order.id}`);
        for (product of result){
            let title = await getProductNameById(product.product_id);
            order.products.push({
                id: product.product_id,
                size: product.size,
                amount: product.amount,
                title: title.title,
            })
        }

        orders.push(order);
    }
    connection.release();
    return {
        code: 200,
        orders: orders
    };
}

module.exports.deleteOrder = async function deleteOrder(id){
    const connection = await conn.getConnection();

    try{
        await connection.query('DELETE FROM orders WHERE order_id = ?', [id])
        await connection.query('DELETE FROM order_items WHERE order_id = ?', [id])
    } catch (e) {
        connection.release();
        return {
            code: 501,
            error: e.message
        }
    }

    connection.release();

    return {
        code: 200,
        deletedId: id
    }

}