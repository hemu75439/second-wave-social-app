const loginValid = (req, res, next)=> {
    
    if(/^@[a-z_]+$/i.test(req.body.username)) {

        let password = req.body.password
        if(password.length >= 6) {

            if(/^[a-zA-Z@]+$/i.test(req.body.password)) {

                next()

            } else {
                res.render('login', {
                    title: "Login",
                    errors: {
                        msg: "Password must only contain a-z, A-Z, @"
                    }
                })
            }
        
        } else {
            res.render('login', {
                title: "Login",
                errors: {
                    msg: "Password min. length 6 characters"
                }
            })
        }

    } else {
        res.render('login', {
            title: "Login",
            errors: {
                msg: "Invalid Username !"
            }
        })
    }
}


module.exports = loginValid