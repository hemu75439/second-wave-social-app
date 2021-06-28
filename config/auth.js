const auth = ((req, res, next)=> {
    if(req.session.Uid){
        next()
    }
    else {
        res.render('login', {
            title: "Login",
            errors: {
                msg: "Login first !"
            }
        })
    }
})


module.exports = auth