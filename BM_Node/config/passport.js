const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const adminModel = require('../models/Admin')
const employeeModel = require('../models/Employee')


module.exports = function(passport){
passport.use(
    new LocalStrategy({usernameField:'email'},(email,password,done)=>{
        // var modelName = usertype ==='admin'?adminModel:employeeModel
        // Match User
        adminModel.findOne({email:email})
        .then(user=>{
            if(!user){
                return done(null,false,{message:'User Does not Exists'})
            }
            // Match Password
            bcrypt.compare(password,user.password,(err,ismatch)=>{
                if(err) throw err;

                if(ismatch){
                    return done(null,user)
                }else{
                    return done(null,false,{message:'Password Incorrect'})
                }
            })
        }).catch(err=>console.log(err))
    })
)
passport.serializeUser((user,done)=>{
    done(null,user.id)
})
passport.deserializeUser((id,done)=>{
    adminModel.findById(id,(err,user)=>{
        done(err,user)
    })
})
}