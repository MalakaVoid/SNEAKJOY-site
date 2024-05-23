module.exports.userCheck = async function userCheck(req, res, next){
    if (!req.session.user){
        res.status(301).redirect('/authorization');
        return;
    }
    next()
}

module.exports.userCheckAdmin = async function userCheckAdmin(req, res, next){
    if (!req.session.user){
        res.status(301).redirect('/authorization');
        return;
    }
    if (!req.session.user?.isAdmin){
        res.status(404).render('pages/404', {
            settings:{
                title: 'Error',
                isHeaderWhite: false
            },
            isAdmin: !!req.session.user?.isAdmin,
        });
        return;
    }
    next()
}