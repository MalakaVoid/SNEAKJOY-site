const conn = require('./database');
const mysql = require('mysql2/promise');


module.exports.addReview = async function addReview( userId, name, email, text ){
    const connection = await conn.getConnection();
    let results = [];
    try{
        [results] = await connection.query(
            `INSERT INTO reviews (review_id, name, email, text, user_id) VALUES (NULL, '${name}', '${email}', '${text}', '${userId}');`
        );
    } catch(e){
        connection.release();
        return {
            code: 501, 
            error: e.message
        }
    }
    connection.release();
    
    return {
        code: 200,
        id: results.insertId
    };
}

module.exports.getReviews = async function getReviews(){
    const connection = await conn.getConnection();
    let results = [];
    try{
        [results] = await connection.query(
            `SELECT * FROM reviews`
        );
    } catch(e){
        connection.release();
        return {
            code: 501, 
            error: e.message
        }
    }
    connection.release();
    
    return {
        code: 200,
        reviews: results
    };
}


module.exports.deleteReview = async function deleteReview(id){
    const connection = await conn.getConnection();
    try{
        await connection.query('DELETE FROM reviews WHERE review_id = ?', [id]);
    } catch(e){
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
    };
}