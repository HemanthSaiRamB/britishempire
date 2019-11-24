const express = require('express')
const router = express.Router()
const passport = require('passport')

router.post('/applncType',passport.authenticate('jwt',{session:false}),require('../controllers/dumpCtrl').applianceDump)
router.post('/manufType',passport.authenticate('jwt',{session:false}),require('../controllers/dumpCtrl').manufacturerDump)
router.post('/modelNoType',passport.authenticate('jwt',{session:false}),require('../controllers/dumpCtrl').modelNoDump)
router.post('/serialNoType',passport.authenticate('jwt',{session:false}),require('../controllers/dumpCtrl').serialNoDump)
router.post('/nozzleNoType',passport.authenticate('jwt',{session:false}),require('../controllers/dumpCtrl').nozzleNoDump)
router.post('/airFilterSizeType',passport.authenticate('jwt',{session:false}),require('../controllers/dumpCtrl').airFilterSizeDump)
router.post('/accountDtls',passport.authenticate('jwt',{session:false}),require('../controllers/dumpCtrl').accountDtlsDump)
router.post('/capacity',passport.authenticate('jwt',{session:false}),require('../controllers/dumpCtrl').capacityDump)
router.post('/currentLevel',passport.authenticate('jwt',{session:false}),require('../controllers/dumpCtrl').currentLevelDump)
module.exports = router;