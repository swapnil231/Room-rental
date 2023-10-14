
const mongoose=require('mongoose')
const Schema=mongoose.Schema
const imageSchema = new Schema({
  url: { type: String, required: true },
  cloudinaryId: { type: String, required: true},
  createdAt: { type: Date, default: Date.now }
})



// bookingSchema.statics.sendError=function(res,config){
//   const {status=422,detail,title}=config
//   return res.status(status).send({
//     errors:[{title:title,detail:detail}]
//     })
// }

module.exports = mongoose.model('CloudinaryImage', imageSchema);
