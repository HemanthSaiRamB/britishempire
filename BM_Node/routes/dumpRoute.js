const express = require('express')
const router = express.Router()
const passport = require('passport')

router.post('/applncType',require('../controllers/dumpCtrl').applianceDump)
router.post('/manufType',require('../controllers/dumpCtrl').manufacturerDump)
router.post('/modelNoType',require('../controllers/dumpCtrl').modelNoDump)
router.post('/serialNoType',require('../controllers/dumpCtrl').serialNoDump)
router.post('/nozzleNoType',require('../controllers/dumpCtrl').nozzleNoDump)
router.post('/airFilterSizeType',require('../controllers/dumpCtrl').airFilterSizeDump)
router.post('/accountDtls',require('../controllers/dumpCtrl').accountDtlsDump)
router.post('/capacity',require('../controllers/dumpCtrl').capacityDump)
router.post('/currentLevel',require('../controllers/dumpCtrl').currentLevelDump)
module.exports = router;