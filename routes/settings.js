const changePass = require('../model/changePass')
const editProfile = require('../model/editProfile')
const viewProfile = require('../model/viewProfile')

const router = require('express').Router()



router.get('/', (req, res)=> {
    res.render('settings', {
        title: "Settings",
        username: req.session.Uid
    })
})




router.get('/editprofile', viewProfile)

router.post('/editprofile', editProfile)





router.get('/changepassword', (req, res)=> {
    res.render('changePass', {
        title: "Change Password",
        error: false
    })
})

router.post('/changepassword', changePass)




router.get('/prompt/:func', (req, res)=> {

    if(req.params.func == "logout") {

        res.render('prompt', {
            title: "Logout",
            func: "logout"
        })

    }

    if(req.params.func == "deleteaccount") {

        res.render('prompt', {
            title: "Delete Account",
            func: "deleteaccount"
        })

    }

})




module.exports = router