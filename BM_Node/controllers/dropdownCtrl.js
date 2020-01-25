const applianceDumpModel = require('../models/Appliance')
const manufDumpModel = require('../models/Manufacturer')
const modelNoDumpModel = require('../models/ModelNo')
const serialNoDumpModel = require('../models/SerialNo')
const nozzleNoDumpModel = require('../models/NozzleNo')
const airFilterSizeNoDumpModel = require('../models/AirFilterSize')
const accountDtlsModel = require('../models/AccountNo')
const capacityModel = require('../models/Capacity')
const currentLevelModel = require('../models/CurrentLevel')
const userModel= require('../models/Users')
async function getApplianceTypeDrop(req,res){
applianceDumpModel.find({},(err,types)=>{
    res.send(types.map(type=>{
        return {value:type.typeLabel,id:type._id,}
    }))
})
}
async function getManufacturerDrop(req,res){
   var query = {}
    if(req.body.applncId.length){
        query={'applncId':req.body.applncId}
    }else{
        query={}
    }
    manufDumpModel.find(query,(err,types)=>{
        res.send(types.map(type=>{
            return {value:type.typeLabel,id:type._id,}
        }))
    }) 
}
async function getModelNoDrop(req,res){
    var query = {}
    if(req.body.manufId.length){
        query={'manufId':req.body.manufId}
    }else{
        query={}
    }
    modelNoDumpModel.find(query,(err,types)=>{
        res.send(types.map(type=>{
            return {value:type.typeLabel,id:type._id,}
        }))
    })
}
async function getSerialNoDrop(req,res){
    var query = {}
    if(req.body.modelNoId.length){
        query={'modelNoId':req.body.modelNoId}
    }else{
        query={}
    }
    serialNoDumpModel.find(query,(err,types)=>{
        res.send(types.map(type=>{
            return {value:type.typeLabel,id:type._id,}
        }))
    })
}
async function getNozzleNoDrop(req,res){
    nozzleNoDumpModel.find({},(err,types)=>{
        res.send(types.map(type=>{
            return {value:type.typeLabel,id:type._id,}
        }))
    })
}
async function getAirPurDrop(req,res){
    airFilterSizeNoDumpModel.find({},(err,types)=>{
        res.send(types.map(type=>{
            return {value:type.typeLabel,id:type._id,}
        }))
    })
}
async function getAccDtlsDrop(req,res){
  var query={}
    if(req.body.accountNo){
        query={'accountNo':{"$regex":req.body.accountNo,"$options": "i"}}
    }else{
        query={}
    }
    accountDtlsModel.find(query,(err,types)=>{
        res.send(types.map(type=>{
            return {value:type.accountNo,id:type._id,name:type.customerName,address:type.customerAddr}
        }))
    })
}
async function getCapacityDrop(req,res){
    capacityModel.find({},(err,types)=>{
        res.send(types.map(type=>{
            return {value:type.typeLabel,id:type._id,}
        }))
    })
}
async function getCurrentLevelDrop(req,res){
    currentLevelModel.find({},(err,types)=>{
        res.send(types.map(type=>{
            return {value:type.typeLabel,id:type._id,}
        }))
    })
}

async function getAllEmp(req,res){
    var query = {}
    query={'usertype':req.body.usertype}
    userModel.find(query,(err,users)=>{
        res.send(users.map(user=>{
            return {
                value:user.name,
                id:user._id,
                mobilenumber:user.mobilenumber,
                email:user.email,
                age:user.age,
                usertype:user.usertype
            }
        }))
    }) 
}
module.exports={
    getApplianceTypeDrop,
    getManufacturerDrop,
    getModelNoDrop,
    getSerialNoDrop,
    getNozzleNoDrop,
    getAirPurDrop,
    getCapacityDrop,
    getCurrentLevelDrop,
    getAccDtlsDrop,
    getAllEmp
}