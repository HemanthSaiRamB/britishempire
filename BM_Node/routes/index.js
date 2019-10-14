const express = require('express')
const router = express.Router()
const {ensureAuthenticated} = require('../config/auth')
router.get('/',(req,res)=>{
    res.send('hello world')
})

router.get('/dashboard',ensureAuthenticated,(req,res)=>{
    res.send({code:200,msg:'welcome aboard'})
})

module.exports = router;