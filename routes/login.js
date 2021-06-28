const router = require('express').Router()
const loginValid = require('../validation/loginValid')
const login = require('../model/login')


router.get('/', (req, res)=> {
    if(req.session.Uid) res.redirect('/home')
    else {

        res.render('login', {
            title: 'Login',
            errors: false
        })
        
    }
})


router.post('/', loginValid, login)



module.exports = router