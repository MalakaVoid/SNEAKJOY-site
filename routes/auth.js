const express = require('express');
const { getUserByEmail, checkUserEmailExistance, addUser, getUserById, editUser } = require('../database/userOperations');

const router = express.Router();

router.post('/login', async function(req, res){
    let userEmail = req.body.email;
    let userPassword = req.body.password;

    if (userEmail === '' || userPassword === ''){
        res.status(200).json({
            code: 404,
            message: 'Заполните пропуски'
        });
        return;
    }

    let getUserResponse = await getUserByEmail(userEmail);

    if (getUserResponse.code === 404) {
        res.status(200).json({
            code: 404,
            message: 'Пользователь не найден'
        });
        return;
    }

    responseUser = getUserResponse.user;
    if (responseUser.password !== userPassword) {
        res.status(200).json({
            code: 404,
            message: 'Неверный пароль'
        });
        return;
    }

    req.session.user = {
        id: responseUser.id,
        isAdmin: responseUser.isAdmin
    }
    res.status(200).json({
        code: 200,
        user: {
            id: responseUser.id,
            email: responseUser.email,
            isAdmin: responseUser.isAdmin
        }
    })
});

router.post('/register', async function(req, res){
    let userEmail = req.body.email;
    let userPassword = req.body.password;
    let userName = req.body.name;
    let isAdmin = req.body.isAdmin;

    if (isAdmin === undefined){
        isAdmin = 0;
    }

    if (userEmail === '' || userPassword === '' || userName === '') {
        res.status(200).json({
            code: 404,
            message: 'Заполните пропуски'
        });
        return;
    }
    
    let isEmailExist = await checkUserEmailExistance(userEmail);

    if (isEmailExist){
        res.status(200).json({
            code: 404,
            message: 'Пользователь с таким email уже существует'
        });
        return;
    }

    let addUserResponse = await addUser(userEmail, userPassword, userName, isAdmin);

    if (addUserResponse.code === 501){
        console.log(addUserResponse.error);
        res.status(501).json({
            code: 501,
        });
        return;
    }

    let getUserResponse = await getUserById(addUserResponse.userId);

    if (getUserResponse.code === 501){
        console.log(getUserResponse.error);
        res.status(501).json({
            code: 501,
        });
        return;
    }

    res.status(200).json({
        code: 200,
        user: {
            id: getUserResponse.user.id,
            email: getUserResponse.user.email,
            isAdmin: getUserResponse.user.isAdmin
        }
    })
});

router.post('/getuserbyid', async function(req, res){
    let userId = req.session.user.id;
    let getUserResponse = await getUserById(userId);

    if (getUserResponse.code === 501) {
        res.status(501).json({
            code: 501,
        });
        return;
    }

    if (getUserResponse.code === 404) {
        res.status(200).json({
            code: 404,
            message: 'Пользователь не найден'
        });
        return;
    }

    responseUser = getUserResponse.user;

    res.status(200).json({
        code: 200,
        user: {
            id: responseUser.id,
            name: responseUser.name,
            email: responseUser.email,
            isAdmin: responseUser.isAdmin,
        }
    })
});


router.post('/edituser', async function(req, res){
    let userId = req.body.id;
    let userEmail = req.body.email;
    let userPassword = req.body.password;
    let userName = req.body.name;
    let isAdmin = req.body.isAdmin;

    let userPrevious = await getUserById(userId);

    if (userPassword === '') {
        userPassword = userPrevious.password;
    }

    let response = await editUser(userId, userEmail, userName, userPassword, isAdmin);

    if (response.code === 501){
        res.status(501).json({
            code: 501,
        })
        return;
    }

    res.status(200).json({
        code: 200,
        user: {
            id: userId,
            name: userName,
            email: userEmail,
            isAdmin: isAdmin,
        }
    })

});

router.post('/checkauth', async function(req, res){
    if (!req.session.user){
        res.status(200).json({
            code: 404,
            message: 'Пользователь не авторизован'
        });
        return;
    }

    res.status(200).json({
        code: 200,
        user: {
            id: req.session.user.id,
            isAdmin: req.session.user.isAdmin
        }
    })

});

module.exports = router;