const router = require('express').Router()
const addFrnd = require('../model/addFrnd')
const frndList = require('../model/frndList')
const isFrnd = require('../model/isFrnd')
const unfrnd = require('../model/unfrnd')



router.get('/', frndList)

router.get('/isfriend/:user', isFrnd)


router.post('/addfriend/:ID', addFrnd)


router.delete('/unfriend/:ID', unfrnd)


module.exports = router