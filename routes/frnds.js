const router = require('express').Router()
const addFrnd = require('../model/addFrnd')
const frndList = require('../model/frndList')
const unfrnd = require('../model/unfrnd')



router.get('/', frndList)


router.post('/addfriend/:ID', addFrnd)


router.delete('/unfriend/:ID', unfrnd)


module.exports = router