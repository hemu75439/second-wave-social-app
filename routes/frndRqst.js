const sendRqst = require('../model/sendRqst')
const cancelRqst = require('../model/cancelRqst')
const frndRqsts = require('../model/frndRqsts')

const router = require('express').Router()



router.get('/', frndRqsts)

router.put('/sendrequest/:ID', sendRqst)

router.put('/cancelrequest/:ID', cancelRqst)



module.exports = router