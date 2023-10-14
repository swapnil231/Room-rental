
const express=require('express')
const router=express.Router()
const{getRentals,getRentalsById,creatRentals,deletRentals,updateRentals,getUserRentals,deleteRental,updateRental,verifyuser}=require('../controllers/rentals')
const{onlyAuthUser}=require('../controllers/users')


router.get('',getRentals)
router.get('/me',onlyAuthUser,getUserRentals)

router.get('/:rentalId',getRentalsById)
router.get('/:rentalId/verify-user',onlyAuthUser,verifyuser)



router.post('',onlyAuthUser,creatRentals)

// router.delete('/:rentalId',deletRentals)

// router.patch('/:rentalId',updateRentals)

router.delete('/:rentalId',onlyAuthUser,deleteRental)

router.patch('/:rentalId',onlyAuthUser,updateRental)

module.exports=router
