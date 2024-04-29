const express = require('express');
const { addReview } = require('../database/reviewOperations');


const router = express.Router();


router.post('/addreview', async function(req, res){
    console.log(1)
    let userId = req.body.userId;
    let userName = req.body.name;
    let userEmail = req.body.email;
    let userText = req.body.text;

    let addReviewResponse = await addReview(userId, userName, userEmail, userText)

    if (addReviewResponse.code === 501) {
        res.status(501).json({
            code: 501,
        });
        return;
    }

    res.status(200).json({
        code: 200,
    });

});


module.exports = router;