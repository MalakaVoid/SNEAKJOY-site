const express = require('express');
const { getAllUsers, checkUserEmailExistance, addUser, deleteUser, editUser } = require('../../database/userOperations');

const router = express.Router();


router.get('/', async function (req, res) {
    
    let response = await getAllUsers();

    res.status(200).json(response);

})

router.post('/', async function (req, res) {

    let { email, name, password, is_admin } = req.body;
    
    let isEmailExist = await checkUserEmailExistance(email);

    if (isEmailExist){
        res.status(200).json({
            code: 404,
            error: 'Пользователь с таким email уже существует'
        });
        return;
    }

    let addUserResponse = await addUser(email, password, name, is_admin);

    res.status(200).json(addUserResponse);

})

router.delete('/', async function(req, res) {

    let { id } = req.body;

    let response = await deleteUser(id);

    res.status(200).json(response);

})

router.put('/', async function(req, res) {

    let { id, email, name, password, is_admin } = req.body;

    let isEmailExist = await checkUserEmailExistance(email);

    if (isEmailExist){
        res.status(200).json({
            code: 404,
            error: 'Пользователь с таким email уже существует'
        });
        return;
    }
    
    let response = await editUser(id, email, name, password, is_admin);

    res.status(200).json(response);

})


module.exports = router;