const express = require('express');
const router = express.Router();
const {
  createBooking ,getbooking} = require('../controllers/booking');
const { onlyAuthUser} = require('../controllers/users');

const{isuserRentalowner}=require('../controllers/rentals')

router.post('', onlyAuthUser, isuserRentalowner,createBooking);
router.get('',getbooking)

module.exports = router;
