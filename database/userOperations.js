const conn = require('./database');
const mysql = require('mysql2/promise');


module.exports.getUserByEmail = async function getUserByEmail( email ){
    const connection = await conn.getConnection();
    let results = [];
    try{
        [results] = await connection.query(`SELECT * FROM users WHERE email='${email}'`);
    } catch(e){
        connection.release();
        return {
            code: 501, 
            error: e.message
        }
    }
    connection.release();

    if (results.length === 0){
        return {
            code: 404
        }
    }
    
    let user = {
        id: results[0].user_id,
        name: results[0].name,
        email: results[0].email,
        password: results[0].password,
        isAdmin: results[0].is_admin == 1
    }

    return {
        code: 200,
        user: user
    };
}

module.exports.getUserById = async function getUserById( id ){
    const connection = await conn.getConnection();
    let results = [];
    try{
        [results] = await connection.query(`SELECT * FROM users WHERE user_id=${id}`);
    } catch(e){
        connection.release();
        return {
            code: 501, 
            error: e.message
        }
    }
    connection.release();

    if (results.length === 0){
        return {
            code: 404
        }
    }
    
    let user = {
        id: results[0].user_id,
        name: results[0].name,
        email: results[0].email,
        password: results[0].password,
        isAdmin: results[0].is_admin == 1
    }

    return {
        code: 200,
        user: user
    };
}

module.exports.getAllUsers = async function getAllUsers(){
    const connection = await conn.getConnection();
    let result = [];
    try{
        [results] = await connection.query(`SELECT * FROM users`);
    } catch(e){
        connection.release();
        return {
            code: 501,
            error: e.message
        }
    }
    connection.release();
    
    let users = results.map(user => {
        return {
            id: user.user_id,
            name: user.name,
            email: user.email,
            password: user.password,
            isAdmin: user.is_admin == 1
        }
    })

    return {
        code: 200,
        users: users
    };
}

module.exports.checkUserEmailExistance = async function checkUserEmailExistance( email ){
    const connection = await conn.getConnection();
    let results = [];
    try{
        [results] = await connection.query(`SELECT user_id FROM users WHERE email='${email}'`);
    } catch(e){
        connection.release();
        return {
            code: 501,
            error: e.message
        }
    }
    connection.release();

    return results.length > 0;
}

module.exports.addUser = async function addUser(email, name, password, isAdmin){
    const connection = await conn.getConnection();
    let results = [];
    try{
        [results] = await connection.query(
            `INSERT INTO users (user_id, email, name, password, is_admin) VALUES (NULL, '${email}', '${name}', '${password}', ${isAdmin})`
        );
    }catch(e){
        connection.release();
        return {
            code: 501,
            error: e.message,
        }
    }
    connection.release();

    return {
        code: 200,
        userId: results.insertId,
    };
}


module.exports.editUser = async function editUser(userId, email, name, password, isAdmin){
    const connection = await conn.getConnection();
    let results = [];
    try{
        [results] = await connection.query(`SELECT * FROM users WHERE user_id = ${userId}`);

        await connection.query(
            `UPDATE users SET email = '${email}', name = '${name}', password = '${password}', is_admin = '${isAdmin? 1 : 0}' WHERE user_id = ${userId}`
        );
    }catch(e){
        connection.release();
        return {
            code: 501,
            error: e.message
        }
    }
    connection.release();

    return {
        code: 200,
        oldUser: {
            id: results[0].user_id,
            name: results[0].name,
            email: results[0].email,
            password: results[0].password,
            isAdmin: results[0].is_admin == 1
        },
        newUser: {
            id: userId,
            name: name,
            email: email,
            password: password,
            isAdmin: isAdmin
        }
    };
}


module.exports.deleteUser = async function deleteUser(id){
    const connection = await conn.getConnection();
    let results ;
    try{
        [results] = await connection.query(`SELECT * FROM users WHERE user_id = ${id}`);
        await connection.query(`DELETE FROM users WHERE user_id = ${id}`);
    }catch(e){
        connection.release();
        return {
            code: 501,
            error: e.message
        }
    }
    connection.release();

    return {
        code: 200,
        user: {
            id: results[0].user_id,
            name: results[0].name,
            email: results[0].email,
            password: results[0].password,
            isAdmin: results[0].is_admin == 1
        }
    };
}
