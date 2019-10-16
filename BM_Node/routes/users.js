const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const secret = require('../config/keys').secret
// User Model
const UserModel = require('../models/Users')

// register handle
router.post('/register',(req,res)=>{
    const {name,age,gender,mobilenumber,email,password,cnfpwd,usertype}=req.body;
    let errors = [];

    // check required fields
    if(!name || !age || !gender || !mobilenumber || !email || !password || !cnfpwd){
        errors.push({success:false,code:406,msg:"Please fill in all fields"});
    }
    // if passwords do not match
   if(password !== cnfpwd){
        errors.push({success:false,code:406,msg:"Password and Confirm Password Do not match"})
    }
    // Check Password length
    if(password.length <6){
        errors.push({success:false,code:406,msg:"Password should be 6 charecters strictly"})
    }
    // email validation
    var re = /\S+@\S+\.\S+/;
    if(!re.test(email)){
        errors.push({success:false,code:406,msg:"Invalid Email Id"})
    }
    if(errors.length >0){
        res.send(errors)
    }else{
        UserModel.findOne({email:email}).then(user=>{
            if(user){
                // User Exists 
                errors.push({success:false,code:406,msg:"User Already Exists"})
                res.send(errors)
            }else{
                const newUser = new UserModel({
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
                                res.send({success:true,code:200,msg:usertype+' saved successfully',userObj:userObj})
                        }).catch((err)=>{
                            errors.push({success:false,code:403,msg:err})
                        })
                    })
                )
            }
        })
    }
})

// login handle
router.post('/login',(req,res,next)=>{
    const email = req.body.email;
    const password = req.body.password;   
    let errors = [];
    UserModel.findOne({ email })
         .then(user => {
            if (!user) {
                errors.push({success:false,code:404,msg:"User Does Not Exists"});
                res.send(errors)
           }else{
                    bcrypt.compare(password, user.password)
                    .then(isMatch => {
                    if (isMatch) {
                        const payload = {
                        _id: user._id,
                        name: user.userName
                        };
                        jwt.sign(payload, secret, { expiresIn: 36000 },
                                (err, token) => {
                                if (err) res.status(500)
                                .json({
                                    success:false,
                                    error: "Error signing token",
                                        raw: err }); 
                                res.json({ 
                                success: true,
                                token: `Bearer ${token}` });
                        });      
                } else {
                    errors.push({success:false,code:400,msg:"Password Incorrect"});
                    res.send(errors)
        }
        }).catch(err=>{
            console.log(err)
        })
           }
        
    }).catch(err=>{
        console.log(err)
    })
})

//logout handle

router.get('/logout', (req,res)=>{
    req.logOut()
    res.send({code:200,msg:'your are logged out'})
})

module.exports = router;