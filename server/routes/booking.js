const express = require('express');
const router = express.Router();

const {
  createBooking ,getbooking,getUserbookings,getRecivedBooking,deleteBooking} = require('../controllers/booking');
const { onlyAuthUser} = require('../controllers/users');

const{isuserRentalowner}=require('../controllers/rentals')

router.post('', onlyAuthUser, isuserRentalowner,createBooking);

router.get('',getbooking)

router.get('/me',onlyAuthUser,getUserbookings)
router.get('/received',onlyAuthUser,getRecivedBooking)

router.delete('/:bookingId',onlyAuthUser,deleteBooking)
module.exports = router;
