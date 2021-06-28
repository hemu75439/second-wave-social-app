const router = require('express').Router()



router.get('/', (req, res)=> {
    res.render('chat', {
        title: "Chat"
    })
})





module.exports = router