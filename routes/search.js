const randomSearch = require('../model/randomSearch')
const searchUser = require('../model/searchUser')

const router = require('express').Router()



router.get('/', randomSearch)

router.post('/', searchUser)



module.exports = router