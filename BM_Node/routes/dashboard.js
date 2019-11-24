const express = require('express')
const router = express.Router()
const passport = require('passport')


router.get('/dashboard',passport.authenticate('jwt',{session:false}),(req,res)=>{
    res.send({code:200,msg:'welcome aboard'})
})


module.exports = router;