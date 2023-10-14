
 const express=require('express')
 const router=express.Router()
 const{createRegister,createLogin}=require('../controllers/users')

 router.post('/register',createRegister)
 router.post('/login',createLogin)

 module.exports=router
