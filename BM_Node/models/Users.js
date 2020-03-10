const mongoose = require('mongoose')
const modelName = require('../config/modelname').user
const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    age:{
        type:String,
        required:true
    },
    gender:{
        type:String,
        required:true
    },
    mobilenumber:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    usertype:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now()
    },
    cloudToken:{
        type:String,
        default:'sampletoken'
    }
})

global[modelName] = mongoose.model(modelName,UserSchema);

module.exports = global[modelName]