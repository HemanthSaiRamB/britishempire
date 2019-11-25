const propaneModel = require('../models/PropaneWorkOrder')
const oilModel = require('../models/OilWorkOrder')
async function saveRupdatePropaneWorkDtls(req,res){
    if(!req.body.ComprehensivePropaneInspection.workOrderId.length && req.body.ComprehensivePropaneInspection._id===undefined){
        req.body.ComprehensivePropaneInspection.workOrderId = 'Pro_'+Math.random().toString(36).substr(2, 5)
        const  propaneModelDtls = new propaneModel(req.body.ComprehensivePropaneInspection)
        propaneModelDtls.save().then((propaneSave)=>{
            res.send(propaneSave)
        })
    }else{
        var query = {'_id':req.body.ComprehensivePropaneInspection._id};
        propaneModel.findOneAndUpdate(query,req.body.ComprehensivePropaneInspection, {upsert:false}).then((propaneUpdate)=>{
            res.send(propaneUpdate)
        })
    }
 
}


async function saveRupdateOilWorkDtls(req,res){
    if(!req.body.ComprehensiveOilInspection.workOrderId.length && req.body.ComprehensiveOilInspection._id===undefined){
        req.body.ComprehensiveOilInspection.workOrderId = 'Oil_'+Math.random().toString(36).substr(2, 5)
        const  oilModelDtls = new oilModel(req.body.ComprehensiveOilInspection)
        oilModelDtls.save().then((oilSave)=>{
            res.send(oilSave)
        })
    }else{
        var query = {'_id':req.body.ComprehensiveOilInspection._id};
        oilModel.findOneAndUpdate(query,req.body.ComprehensiveOilInspection, {upsert:false}).then((oilUpdate)=>{
            res.send(oilUpdate)
        })
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