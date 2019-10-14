const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const passport = require('passport')
// Admin Model
const adminModel = require('../models/Admin')
// Employee Model
const employeeModel = require('../models/Employee')

// register handle
router.post('/register',(req,res)=>{
    const {name,age,gender,mobilenumber,email,password,cnfpwd,usertype}=req.body;
    let errors = [];

    // check required fields
    if(!name || !age || !gender || !mobilenumber || !email || !password || !cnfpwd){
        errors.push({code:406,msg:"Please fill in all fields"});
    }
    // if passwords do not match
   if(password !== cnfpwd){
        errors.push({code:406,msg:"Password and Confirm Password Do not match"})
    }
    // Check Password length
    if(password.length <6){
        errors.push({code:406,msg:"Password should be 6 charecters strictly"})
    }
    // email validation
    var re = /\S+@\S+\.\S+/;
    if(!re.test(email)){
        errors.push({code:406,msg:"Invalid Email Id"})
    }
    if(errors.length >0){
        res.send(errors)
    }else{
        var modelName = usertype ==='admin'?adminModel:employeeModel
        modelName.findOne({email:email}).then(user=>{
            if(user){
                // User Exists 
                errors.push({code:406,msg:"User Already Exists"})
                res.send(errors)
            }else{
                const newUser = new modelName({
                    name,
                    age,
                    gender,
                    mobilenumber,
                    email,
                    password,
                    usertype
                })
                bcrypt.genSalt(10,(err,salt)=>
                    bcrypt.hash(newUser.password,salt,(err,hash)=>{
                        if(err) throw err;
                        // set password to hash;
                        newUser.password = hash;
                        // save user
                        newUser.save().
                        then((saveres)=>{
                            var userObj ={
                                "usertype": saveres.usertype,
                                "date": saveres.date,
                                "_id": saveres._id,
                                "name": saveres.name,
                                "age": saveres.age,
                                "gender": saveres.gender,
                                "mobilenumber": saveres.mobilenumber,
                                "email": saveres.email,
                            }
                                res.send({code:200,msg:usertype+' saved successfully',userObj:userObj})
                        }).catch((err)=>{
                            errors.push({code:403,msg:err})
                        })
                    })
                )
            }
        })
    }
})

// login handle
router.post('/login',(req,res,next)=>{
passport.authenticate('local',{
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true 
})(req,res,next);
})

//logout handle

router.get('/logout',async (req,res)=>{
 await req.logOut();
    res.send({code:200,msg:'your are logged out'})
})

module.exports = router;