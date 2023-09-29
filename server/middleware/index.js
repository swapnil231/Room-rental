
exports.provideMongoErrorHandler=(res,req,next)=>{
 res.sendApiError=config=>{
    const {status=422, title,detail}=config
    return res.status(status).send({
      errors:[{title,detail}]
     })
  }
  next()
}

