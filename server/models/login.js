
const mongoose=require('mongoose')
const schema=mongoose.Schema

const loginSchema=new schema({

  email:{type:String,required:true,minlength:[4,'invalid length! Minimum is 4 charactors'],maxlength:[32,'invalid length! Max is 32 charactors']},
  password:{type:String,required:true},


 })

 loginSchema.methods.sendError=function(res,config){
   const {status,detail}=config
   return res.status(status).send({
     errors:[{title:'login Error!',detail:detail}]
    })
 }

 module.exports=mongoose.model('Login',loginSchema)
