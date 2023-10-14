const register=require('../models/users')
const login=require('../models/login')
const jwt=require('jsonwebtoken')
const config=require('../config/dev')
const bcrypt=require('bcryptjs')
const appmidl=require('../middleware/index')



exports.createRegister=async(req,res)=>{
  try{

  const{username,email,password,conformPassword}=req.body

  if(!password || !email){
    return register.sendError(res,{title:'missing data',detail:'email or password missing'})
    return res.sendApiError(
      {
        title:"missing data",detail:"email or password is missing"
      }
     )
  }
  if(password !==conformPassword){
    return register.sendError(res,{title:'invalid password',detail:'password and conFirmpassword not same'})
    return res.sendApiError(
      {
        title:"invalid password",detail:"password and conFirmpassword not same"
      }
     )

  }

  const findOnex= await register.findOne({email})

  if(findOnex){
    return register.sendError(res,{title:'invalid email',detail:'email alredy exist'})
    return res.sendApiError(
      {
        title:"invalid email",detail:"email alredy exist"
      }
     )

  }

     const newregister=new register({username,password,email})
     const creatregister=await newregister.save()

     if(creatregister){
      return res.json({ message:`new user is registered with ${creatregister._id}`})
    }

    }catch(err){
      return register.sendError(res,{title:'db error',detail:'cant post data'})
    return res.sendApiError(
      {
        title:"db error",
        detail:"cant post data"
      }
     )


  }
}

exports.createLogin=async(req,res)=>{
try{
   const{email,password}=req.body

   if(!password || !email){
      return register.sendError(res,{title:'missing data',detail:'email or password missing'})
    return res.sendApiError(
      {
        title:"missing data",detail:"email or password is missing"
      }
     )
    }

   const findOnex= await register.findOne({email})

  if(!findOnex){
    return register.sendError(res,{title:'invalid email',detail:'user with this email not exist'})
    return res.sendApiError(
      {
        title:"invalid email",detail:"user with this email not exist"
      }
     )
   }

   if(findOnex){
    authtoken(password,email,findOnex,res)
  }

    }catch(err){
      return register.sendError(res,{title:'DB Error',detail:'cant login'})
    return res.sendApiError(
      {
        title:"DB Error",
        detail:"cant login'"
      }
     )

    }
}

exports.onlyAuthUser=async(req,res,next)=>{

try{

     const token =req.headers.authorization

     if(!token){
      return notAuthorised(res)
     }

     if(token){
      console.log(1)
      const {decodedtoken,error}=parsetoken(token)
      if(error){
        return register.sendError(res,{title:'DB Error',detail:error})
      return res.sendApiError(
        {
          title:"DB Error",
          detail:error
        }
       )

      }


     if(!decodedtoken){
       console.log(2)
       return notAuthorised(res)
     }
     const findbyidx= await register.findById(decodedtoken.sub)



     if(!findbyidx){
        console.log(3)
      return notAuthorised(res)
     }


     if(findbyidx){
          console.log(4)
       res.locals.user=findbyidx
        next()
       }else{
         return notAuthorised(res)
       }


   }
  }catch(err){
    console.log(err)
    return register.sendError(res,{title:'DB Error',detail:'oops something wrong'})
    return res.sendApiError(
      {
        title:"DB Error",detail:"oops something wrong"
      }
     )
  }
}



function parsetoken(token){
  try{
  const decodedtoken= jwt.verify(token.split(' ')[1],config.JWT_SECRET)
  return{decodedtoken}
  }catch(error){
    return{error:error.message}

  }


}

function notAuthorised(res){
  return res.status(401).send(
    {
      errors:[
         {title: 'not authorized',detalis:'you need to log in to get acess'}
      ]
    }
 )

}

async function authtoken(password,email,findOnex,res){
  try{
   const x = await bcrypt.compare(password, findOnex.password)

   if(x){
     const token=jwt.sign({
     sub:findOnex.id,
     username:findOnex.username,
     },config.JWT_SECRET,{expiresIn:"2h"
     })
    //  const findlogin= await login.findOne({email})

  //  if(!findlogin){

  //      const newlogin=new login({email,password})

  //      const creatlogin=await newlogin.save()


  //      if(creatlogin){
  //      return res.json({token:token, message:`new user is login with id ${creatlogin._id}`})
  //       }
  //     }

  //     if(findlogin){
  //       return res.json({token:token,message:'token send'})
  //     }


        return res.json({token:token,message:'login sucessfully',
      })

 }
   if(x===false){
    return register.sendError(res,{title:'password error',detail:'password is wrong'})
    return res.sendApiError(
      {
        title:"password error",detail:"password is wrong"
      }
     )
    }

  }catch(err){
    console.log('hiiii')
    //  return res.status(422).send({errors:[{title:'DB Error', detail:'oops something wrong'}]})
    return register.sendError(res,{title:'DB Error',detail:'oops something wrong'})
   }

}
