module.exports.userCheck = async function userCheck(req, res, next){
    if (!req.session.user){
        console.log('checkAuth')
        res.status(301).redirect('/authorization');
        return;
    }
    next()
}