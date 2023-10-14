
exports.provideMongoErrorHandler=(req,res,next)=>{
 res.sendApiError=config=>{
    const {status=422, title,detail}=config
    return res.status(status).send({
      errors:[{title,detail}]
     })
  }
  next()
}
exports.provideMongoErrorHandler2=(req,res,next)=>{
 res.mongoError= dbError=>{
  const normalizedError=[]
  const errorFeild='errors'
  if( dbError && dbError.hasOwnProperty(errorFeild) &&  dbError.name==='ValidationError'){
    const errors=dbError[errorFeild]
    for(let property in errors){
      normalizedError.push({title :property,detail:errors[property].message})
    }

    }else{
      normalizedError.push({title :'db error',detail:'oops something went wrong'})

  }
 return res.status(422).send({errors:normalizedError})

 }
  next()
}

