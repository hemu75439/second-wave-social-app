const signupValid = (req, res, next)=> {
    
    if(/^@[a-z_A-Z0-9]+$/i.test(req.body.username)) {

        let password = req.body.password
        if(password.length >= 6) {

            if(/^[a-zA-Z0-9@]+$/i.test(req.body.password)) {

                if(req.body.password == req.body.confirmPassword) {

                    next()

                } else {
                    res.render('signup', {
                        title: "Sign Up",
                        errors: {
                            msg: "Passwords don't match !"
                        }
                    })
                }

            } else {
                res.render('signup', {
                    title: "Sign Up",
                    errors: {
                        msg: "Password must contain a-z, A-Z, 0-9, @"
                    }
                })
            }
        
        } else {
            res.render('signup', {
                title: "Sign Up",
                errors: {
                    msg: "Password min. length 6 characters"
                }
            })
        }

    } else {
        res.render('signup', {
            title: "Sign Up",
            errors: {
                msg: "Invalid Username !"
            }
        })
    }
}


module.exports = signupValid