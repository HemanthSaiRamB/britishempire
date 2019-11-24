const express = require('express')
const router = express.Router()
const passport = require('passport')

router.post('/applncDropDown',passport.authenticate('jwt',{session:false}),require('../controllers/dropdownCtrl').getApplianceTypeDrop)
router.post('/manufDropDown',passport.authenticate('jwt',{session:false}),require('../controllers/dropdownCtrl').getManufacturerDrop)
router.post('/modelNoDropDown',passport.authenticate('jwt',{session:false}),require('../controllers/dropdownCtrl').getModelNoDrop)
router.post('/serialNoDropDown',passport.authenticate('jwt',{session:false}),require('../controllers/dropdownCtrl').getSerialNoDrop)
router.post('/nozzleNoDropDown',passport.authenticate('jwt',{session:false}),require('../controllers/dropdownCtrl').getNozzleNoDrop)
router.post('/airFilterSizeDropDown',passport.authenticate('jwt',{session:false}),require('../controllers/dropdownCtrl').getAirPurDrop)
router.post('/accountDtlsDropDown',passport.authenticate('jwt',{session:false}),require('../controllers/dropdownCtrl').getAccDtlsDrop)
router.post('/capacityDropDown',passport.authenticate('jwt',{session:false}),require('../controllers/dropdownCtrl').getCapacityDrop)
router.post('/currentLevelDropDown',passport.authenticate('jwt',{session:false}),require('../controllers/dropdownCtrl').getCurrentLevelDrop)
module.exports = router;