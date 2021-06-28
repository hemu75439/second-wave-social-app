const router = require('express').Router()
const createPost = require('../model/createPost')
const getTimeline = require('../model/getTimeline')
const like = require('../model/like')
const dislike = require('../model/dislike')


router.get('/', getTimeline)


router.get('/createpost', (req, res)=> {
    res.render('createPost', {
        title: "What's up ?"
    })
})

router.post('/createpost', createPost)

router.put('/like/:postID', like)

router.put('/dislike/:postID', dislike)


module.exports = router