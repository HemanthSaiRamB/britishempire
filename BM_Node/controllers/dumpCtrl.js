const applianceDumpModel = require('../models/Appliance')
const manufDumpModel = require('../models/Manufacturer')
const modelNoDumpModel = require('../models/ModelNo')
const serialNoDumpModel = require('../models/SerialNo')
const nozzleNoDumpModel = require('../models/NozzleNo')
const airFilterSizeNoDumpModel = require('../models/AirFilterSize')
const accountDtlsModel = require('../models/AccountNo')
const capacityModel = require('../models/Capacity')
const currentLevelModel = require('../models/CurrentLevel')
var AWS = require('aws-sdk');
AWS.config.loadFromPath(process.cwd()+'/s3_config.json');
var s3Bucket = new AWS.S3( { params: {Bucket: 'custsignatures'} } );

async function applianceDump(req, res) {
    const {typeLabel} = req.body
    const applncModel = new applianceDumpModel({
        typeLabel
    })
    applianceDumpModel.findOne({typeLabel:typeLabel}).then(found=>{
        if(found){
                res.send('label already exits')
        }else{
            applncModel.save().then((applncSaveRes)=>{
                res.send(applncSaveRes)
            }).catch(error=>{
                res.send(error)
            })
        }
    })
   
}

async function manufacturerDump(req, res) {
    const {typeLabel,applncId} = req.body
    const manufModel = new manufDumpModel({
        typeLabel,
        applncId
    })

    manufDumpModel.findOne({typeLabel:typeLabel}).then(found=>{
        if(found){
	        res.send('label already exits')
        }else{
            manufModel.save().then((manufSaveRes)=>{
                res.send(manufSaveRes)
            }).catch(error=>{
                res.send(error)
            })
        }
    })

   
}

async function modelNoDump(req, res) {
    const {typeLabel,manufId} = req.body
    const modelNoModel = new modelNoDumpModel({
        typeLabel,
        manufId
    })

    modelNoDumpModel.findOne({typeLabel:typeLabel}).then(found=>{
        if(found){
	  res.send('label already exits')
        }else{
            modelNoModel.save().then((modelNoSaveRes)=>{
                res.send(modelNoSaveRes)
            }).catch(error=>{
                res.send(error)
            })
        }
    })

   
}

async function serialNoDump(req, res) {
    const {typeLabel,modelNoId} = req.body
    const serialNoModel = new serialNoDumpModel({
        typeLabel,
        modelNoId
    })
    serialNoDumpModel.findOne({typeLabel:typeLabel}).then(found=>{
        if(found){
	  res.send('label already exits')
        }else{
            serialNoModel.save().then((serialNoSaveRes)=>{
                res.send(serialNoSaveRes)
            }).catch(error=>{
                res.send(error)
            })
        }
    })
   
}

async function nozzleNoDump(req, res) {
    const {typeLabel} = req.body
    const nozzleNoModel = new nozzleNoDumpModel({
        typeLabel
    })
    nozzleNoDumpModel.findOne({typeLabel:typeLabel}).then(found=>{
        if(found){
	  res.send('label already exits')
        }else{
            nozzleNoModel.save().then((nozzleSaveRes)=>{
                res.send(nozzleSaveRes)
            }).catch(error=>{
                res.send(error)
            })
        }
    })
   
}

async function airFilterSizeDump(req, res) {
    const {typeLabel} = req.body
    const airFilterSizeModel = new airFilterSizeNoDumpModel({
        typeLabel
    })

    airFilterSizeNoDumpModel.findOne({typeLabel:typeLabel}).then(found=>{
        if(found){
	  res.send('label already exits')
        }else{
            airFilterSizeModel.save().then((airFilterSizeSaveRes)=>{
                res.send(airFilterSizeSaveRes)
            }).catch(error=>{
                res.send(error)
            })
        }
    })
   
}

async function accountDtlsDump(req,res){
    const {accountNo,customerName,customerAddr} = req.body
    const accountNoDtlsModel = new accountDtlsModel({
        accountNo,
        customerName,
        customerAddr
    })

    accountDtlsModel.findOne({accountNo:accountNo}).then(found=>{
        if(found){
	    res.send('account number already exits')
        }else{
            accountNoDtlsModel.save().then((accDtlsSaveRes)=>{
                res.send(accDtlsSaveRes)
            }).catch(error=>{
                res.send(error)
            })
        }
    })
}

async function capacityDump(req, res) {
    const {typeLabel} = req.body
    const capacityDtlsModel = new capacityModel({
        typeLabel
    })
    capacityModel.findOne({typeLabel:typeLabel}).then(found=>{
        if(found){
	  res.send('label already exits')
        }else{
            capacityDtlsModel.save().then((capacitySaveRes)=>{
                res.send(capacitySaveRes)
            }).catch(error=>{
                res.send(error)
            })
        }
    })
   
}

async function currentLevelDump(req, res) {
    const {typeLabel} = req.body
    const currentLevelDtlsModel = new currentLevelModel({
        typeLabel
    })
    currentLevelModel.findOne({typeLabel:typeLabel}).then(found=>{
        if(found){
	  res.send('label already exits')
        }else{
            currentLevelDtlsModel.save().then((currentLevelSaveRes)=>{
                res.send(currentLevelSaveRes)
            }).catch(error=>{
                res.send(error)
            })
        }
    })
   
}

async function uploadCustSignature(req, res) {
  var buf = new Buffer(req.body.imageBinary.replace(/^data:image\/\w+;base64,/, ""),'base64')
    var dataObj = {
      Key: Math.random().toString(), 
      Body: buf,
      ContentEncoding: 'base64',
      ContentType: 'image/png'
    };
    s3Bucket.putObject(dataObj, function(err, data){
        if (err) { 
          console.log(err);
          console.log('Error uploading data: ', data); 
        } else {
          console.log('succesfully uploaded the image!');
          data.fileUrl='https://custsignatures.s3.ap-south-1.amazonaws.com/'+dataObj.Key
          res.send(data)
        }
    });
    
}

module.exports={
    applianceDump,
    manufacturerDump,
    modelNoDump,
    serialNoDump,
    nozzleNoDump,
    airFilterSizeDump,
    accountDtlsDump,
    capacityDump,
    currentLevelDump,
    uploadCustSignature
} 