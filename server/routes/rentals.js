
const express=require('express')
const router=express.Router()
const{getRentals,getRentalsById,creatRentals,deletRentals,updateRentals,}=require('../controllers/rentals')
const{onlyAuthUser}=require('../controllers/users')


router.get('',getRentals)

router.get('/:rentalId',getRentalsById)

router.post('',onlyAuthUser,creatRentals)

router.delete('/:rentalId',deletRentals)

router.patch('/:rentalId',updateRentals)

module.exports=router
