const express = require('express')
const router = express.Router()
const passport = require('passport')

router.post('/applncDropDown',require('../controllers/dropdownCtrl').getApplianceTypeDrop)
router.post('/manufDropDown',require('../controllers/dropdownCtrl').getManufacturerDrop)
router.post('/modelNoDropDown',require('../controllers/dropdownCtrl').getModelNoDrop)
router.post('/serialNoDropDown',require('../controllers/dropdownCtrl').getSerialNoDrop)
router.post('/nozzleNoDropDown',require('../controllers/dropdownCtrl').getNozzleNoDrop)
router.post('/airFilterSizeDropDown',require('../controllers/dropdownCtrl').getAirPurDrop)
router.post('/accountDtlsDropDown',require('../controllers/dropdownCtrl').getAccDtlsDrop)
router.post('/capacityDropDown',require('../controllers/dropdownCtrl').getCapacityDrop)
router.post('/currentLevelDropDown',require('../controllers/dropdownCtrl').getCurrentLevelDrop)
router.post('/getAllEmp',require('../controllers/dropdownCtrl').getAllEmp)
router.post('/dashboardCount',require('../controllers/dropdownCtrl').dashboardCount)
router.post('/getEmpDetails',require('../controllers/dropdownCtrl').getEmpDetails)

module.exports = router;