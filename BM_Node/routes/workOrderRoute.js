const express = require('express')
const router = express.Router()
const passport = require('passport')

router.post('/propane',passport.authenticate('jwt',{session:false}),require('../controllers/CreateWorkOrder').saveRupdatePropaneWorkDtls)
router.post('/oil',passport.authenticate('jwt',{session:false}),require('../controllers/CreateWorkOrder').saveRupdateOilWorkDtls)
router.post('/getWorkOrder/:workType',passport.authenticate('jwt',{session:false}),require('../controllers/CreateWorkOrder').getWorkOrder)
module.exports = router;