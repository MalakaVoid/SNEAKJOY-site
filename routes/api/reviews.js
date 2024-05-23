const express = require('express');
const { addReview, getReviews, deleteReview } = require('../../database/reviewOperations');


const router = express.Router();


router.post('/addreview', async function(req, res){
    if (!req.session.user){
        res.status(301).json({
            code: 301,
        });
        return;
    }

    let userId = req.session.user.id;
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

router.get('/', async function(req, res){

    let response = await getReviews();

    res.status(200).json(response)

})

router.delete('/', async function(req, res){

    let { id } = req.body;

    let response = await deleteReview(id);

    res.status(200).json(response)

})

module.exports = router;