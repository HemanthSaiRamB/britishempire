const mongoose = require('mongoose')
const modelName = require('../config/modelname').currentLevel
const CurrentLevelSchema = new mongoose.Schema({
    typeLabel:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now()
    }
})

global[modelName] = mongoose.model(modelName,CurrentLevelSchema);

module.exports = global[modelName]