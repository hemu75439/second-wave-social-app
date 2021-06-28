const router = require('express').Router()
const signupValid = require('../validation/signupValid')
const signup = require('../model/signup')


router.get('/', (req, res)=> {
    if(req.session.Uid) res.redirect('/home')
    else {

        res.render('signup', {
            title: 'Sign Up',
            errors: false
        })
        
    }
})


router.post('/', signupValid, signup)




module.exports = router