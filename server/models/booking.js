/* eslint-env es6 */
/* eslint-disable no-console */

const mongoose=require('mongoose')
const Schema=mongoose.Schema
const bookingSchema=new Schema({
  startAt: { type: Date, required: 'Starting date is required'},
  endAt: { type: Date, required: 'Ending date is required'},
  price: { type: Number, required: true },
  nights: { type: Number, required: true },
  guests: { type: Number, required: true },
  user: { type: Schema.Types.ObjectId, ref: 'Register', required: true },
  rental: { type: Schema.Types.ObjectId, ref: 'Rental', required: true },
  createdAt: { type: Date, default: Date.now }



})


bookingSchema.statics.sendError=function(res,config){
  const {status=422,detail,title}=config
  return res.status(status).send({
    errors:[{title:title,detail:detail}]
    })
}

module.exports=mongoose.model('Booking',bookingSchema)
