const mongoose = require('mongoose')
const modelName = require('../config/modelname').admin
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
        default:'admin'
    },
    date:{
        type:Date,
        default:Date.now()
    }
})

global[modelName] = mongoose.model(modelName,UserSchema);

module.exports = global[modelName]