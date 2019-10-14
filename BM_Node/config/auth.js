module.exports ={
    ensureAuthenticated:function(req,res,next){
        if(req.isAuthenticated){
            return next()
        }else{
            res.send({code:401,msg:'unauthorized'})
        }
    }
}