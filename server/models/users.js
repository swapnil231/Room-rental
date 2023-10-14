const mongoose=require('mongoose')
const schema=mongoose.Schema
const bcrypt=require('bcryptjs')
const usersSchema=new schema({
  username: {
    type: String,
    minlength: [4, 'Invalid length! Minimum is 4 characters'],
    maxlength: [32, 'Invalid length! Maximum is 32 characters'],
  },
  email: {
    type: String,
    minlength: [4, 'Invalid length! Minimum is 4 characters'],
    maxlength: [32, 'Invalid length! Maximum is 32 characters'],
    unique: true,
    lowercase: true,
    required: 'Email is required!',
    match: [/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/]
  },
  password: {
    type: String,
    minlength: [4, 'Invalid length! Minimum is 4 characters'],
    maxlength: [32, 'Invalid length! Maximum is 32 characters'],
    required: 'Password is required!'
  }
})

usersSchema.statics.sendError=function(res,config){
  const {status=422,detail,title}=config
  return res.status(status).send({
    errors:[{title:title,detail:detail}]
    })
}

usersSchema.methods.hasSamePassword=function
(providpassword){

return bcrypt.compareSync(providpassword,this.password)

}

usersSchema.pre('save',function(next){
  const user=this
  bcrypt.genSalt(10,(err,salt)=>{
    bcrypt.hash(user.password, salt ,(err,hash)=>{
        user.password=hash
        next()
    })
  })
})

module.exports=mongoose.model('Register',usersSchema)
