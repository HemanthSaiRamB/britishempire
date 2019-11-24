const mongoose = require('mongoose')
const modelName = require('../config/modelname').modelNo
const ModelNo = new mongoose.Schema({
    typeLabel:{
        type:String,
        required:true
    }, manufId:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now()
    }
})

global[modelName] = mongoose.model(modelName,ModelNo);

module.exports = global[modelName]