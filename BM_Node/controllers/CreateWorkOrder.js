const propaneModel = require('../models/PropaneWorkOrder')
const oilModel = require('../models/OilWorkOrder')
const UserModel = require('../models/Users')
var admin = require('firebase-admin');
var serviceAccount = require("../british-empire-firebase-adminsdk-llzjc-cb7fa5da88.json");
var AWS = require('aws-sdk');
AWS.config.loadFromPath(process.cwd()+'/s3_config.json');
var s3Bucket = new AWS.S3( { params: {Bucket: 'custsignatures'} } );
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://british-empire.firebaseio.com'
  });

async function saveRupdatePropaneWorkDtls(req,res){
    if(!req.body.ComprehensivePropaneInspection.workOrderId.length && req.body.ComprehensivePropaneInspection._id===undefined){
        req.body.ComprehensivePropaneInspection.workOrderId = 'Pro_'+Math.random().toString(36).substr(2, 5)
        const  propaneModelDtls = new propaneModel(req.body.ComprehensivePropaneInspection)
        propaneModelDtls.save().then((propaneSave)=>{
            UserModel.findOne({'_id':req.body.ComprehensivePropaneInspection.empId}).then((emp)=>{
                var message = {
                    notification: {
                        title: "Hello..!!",
                        body: req.body.ComprehensivePropaneInspection.workOrderId+" Was Assigned to you "
                      }
                  }
                  var options = {
                    priority: "high",
                    timeToLive: 60 * 60 *24
                  };
                  admin.messaging().sendToDevice(emp.cloudToken,message,options)
                    .then((response) => {
                        // Response is a message ID string.
                        console.log('Successfully sent message:', response);
                        var query = {'_id':propaneSave._id};
                        propaneModel.findOneAndUpdate(query,{"notifSent":1}, {upsert:false}).then((propaneUpdate)=>{
                        })
                    })
                    .catch((error) => {
                        console.log('Error sending message:', error);
                    });
                res.send(propaneSave)
            })
        })
    }else{
        var query = {'_id':req.body.ComprehensivePropaneInspection._id};
        if(req.body.ComprehensivePropaneInspection.status==='completed'){
            uploadCustSignature(req).then(fileUrl=>{
                req.body.ComprehensivePropaneInspection.imageBinary=fileUrl.data
                propaneModel.findOneAndUpdate(query,req.body.ComprehensivePropaneInspection, {upsert:false}).then((propaneUpdate)=>{
                    if(req.body.ComprehensivePropaneInspection.status==='completed'){
                        UserModel.findOne({'_id':req.body.ComprehensivePropaneInspection.createdBy}).then((emp)=>{
                            var message = {
                                notification: {
                                    title: "Hello Admin..!!",
                                    body: req.body.ComprehensivePropaneInspection.workOrderId+" Was Completed "
                                  }
                              }
                              var options = {
                                priority: "high",
                                timeToLive: 60 * 60 *24
                              };
                              admin.messaging().sendToDevice(emp.cloudToken,message,options)
                                .then((response) => {
                                    // Response is a message ID string.
                                    console.log('completed...Successfully sent message:', response);
                                })
                                .catch((error) => {
                                    console.log('Error sending message:', error);
                                });
                        })
                    }
                    res.send(propaneUpdate)
                })
            })
        }else{
            propaneModel.findOneAndUpdate(query,req.body.ComprehensivePropaneInspection, {upsert:false}).then((propaneUpdate)=>{
                if(req.body.ComprehensivePropaneInspection.status==='completed'){
                    UserModel.findOne({'_id':req.body.ComprehensivePropaneInspection.createdBy}).then((emp)=>{
                        var message = {
                            notification: {
                                title: "Hello Admin..!!",
                                body: req.body.ComprehensivePropaneInspection.workOrderId+" Was Completed "
                              }
                          }
                          var options = {
                            priority: "high",
                            timeToLive: 60 * 60 *24
                          };
                          admin.messaging().sendToDevice(emp.cloudToken,message,options)
                            .then((response) => {
                                // Response is a message ID string.
                                console.log('completed...Successfully sent message:', response);
                            })
                            .catch((error) => {
                                console.log('Error sending message:', error);
                            });
                    })
                }
                res.send(propaneUpdate)
            })
        }
       
    }
 
}

async function uploadCustSignature(req) {
   return new Promise((resolve,reject)=>{
    var imageBinary=''
    var imageKey=''
    if(req.body.ComprehensivePropaneInspection){
        imageBinary=req.body.ComprehensivePropaneInspection.imageBinary
        imageKey=req.body.ComprehensivePropaneInspection.workOrderId
    }else{
        imageBinary=req.body.ComprehensiveOilInspection.imageBinary
        imageKey=req.body.ComprehensiveOilInspection.workOrderId
    }
    var buf = new Buffer(imageBinary.replace(/^data:image\/\w+;base64,/, ""),'base64')
      var dataObj = {
        Key: imageKey, 
        Body: buf,
        ContentEncoding: 'base64',
        ContentType: 'image/png'
      };
      s3Bucket.putObject(dataObj,async function(err, data){
          if (err) { 
            console.log(err);
            console.log('Error uploading data: ', data); 
            reject({data:null})
          } else {
            console.log('succesfully uploaded the image!');
            data.fileUrl='https://custsignatures.s3.ap-south-1.amazonaws.com/'+dataObj.Key
            resolve({data:data.fileUrl})
          }
      });
   })
   
      
  }

async function saveRupdateOilWorkDtls(req,res){
    if(!req.body.ComprehensiveOilInspection.workOrderId.length && req.body.ComprehensiveOilInspection._id===undefined){
        req.body.ComprehensiveOilInspection.workOrderId = 'Oil_'+Math.random().toString(36).substr(2, 5)
        const  oilModelDtls = new oilModel(req.body.ComprehensiveOilInspection)
        oilModelDtls.save().then((oilSave)=>{
            UserModel.findOne({'_id':req.body.ComprehensiveOilInspection.empId}).then((emp)=>{
                var message = {
                    notification: {
                        title: "Hello..!!",
                        body: req.body.ComprehensiveOilInspection.workOrderId+" Was Assigned to you "
                      }
                  }
                  var options = {
                    priority: "high",
                    timeToLive: 60 * 60 *24
                  };
                  admin.messaging().sendToDevice(emp.cloudToken,message,options)
                    .then((response) => {
                        // Response is a message ID string.
                        console.log('Successfully sent message:', response);
                        var query = {'_id':oilSave._id};
                        oilModel.findOneAndUpdate(query,{"notifSent":1}, {upsert:false}).then((oilUpdate)=>{
                        })
                    })
                    .catch((error) => {
                        console.log('Error sending message:', error);
                    });
                res.send(oilSave)
            })
        })
    }else{
        var query = {'_id':req.body.ComprehensiveOilInspection._id};
        if(req.body.ComprehensiveOilInspection.status==='completed'){
            uploadCustSignature(req).then(fileUrl=>{
                req.body.ComprehensiveOilInspection.imageBinary=fileUrl.data
                oilModel.findOneAndUpdate(query,req.body.ComprehensiveOilInspection, {upsert:false}).then((oilUpdate)=>{
                    if(req.body.ComprehensiveOilInspection.status==='completed'){
                        UserModel.findOne({'_id':req.body.ComprehensiveOilInspection.createdBy}).then((emp)=>{
                            var message = {
                                notification: {
                                    title: "Hello Admin..!!",
                                    body: req.body.ComprehensiveOilInspection.workOrderId+" Was Completed "
                                  }
                              }
                              var options = {
                                priority: "high",
                                timeToLive: 60 * 60 *24
                              }
                              admin.messaging().sendToDevice(emp.cloudToken,message,options)
                                .then((response) => {
                                    // Response is a message ID string.
                                    console.log('completed...Successfully sent message:', response);
                                })
                                .catch((error) => {
                                    console.log('Error sending message:', error);
                                });
                        })
                    }
                    res.send(oilUpdate)
                })
            })
        }else{
        oilModel.findOneAndUpdate(query,req.body.ComprehensiveOilInspection, {upsert:false}).then((oilUpdate)=>{
            if(req.body.ComprehensiveOilInspection.status==='completed'){
                UserModel.findOne({'_id':req.body.ComprehensiveOilInspection.createdBy}).then((emp)=>{
                    var message = {
                        notification: {
                            title: "Hello Admin..!!",
                            body: req.body.ComprehensiveOilInspection.workOrderId+" Was Completed "
                          }
                      }
                      var options = {
                        priority: "high",
                        timeToLive: 60 * 60 *24
                      }
                      admin.messaging().sendToDevice(emp.cloudToken,message,options)
                        .then((response) => {
                            // Response is a message ID string.
                            console.log('completed...Successfully sent message:', response);
                        })
                        .catch((error) => {
                            console.log('Error sending message:', error);
                        });
                })
            }
            res.send(oilUpdate)
        })}
    }
 
}

async function getWorkOrder(req,res){
    var query=req.body
    if(req.params.workType==='pro'){
      propaneModel.find(query,(err,workOrder)=>{
          res.send(workOrder)
      })
    }else if(req.params.workType==='oil'){
        oilModel.find(query,(err,workOrder)=>{
            res.send(workOrder)
        })
    }else{
        res.send('workorder type '+req.params.workType+' does not exist')
    }
   
}
module.exports={
    saveRupdatePropaneWorkDtls,
    saveRupdateOilWorkDtls,
    getWorkOrder
}