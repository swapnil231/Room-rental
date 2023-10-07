

const Booking=require('../models/booking');
const moment=require('moment')

exports.createBooking=async(req, res)=>{

  try{
  const bookingdata=req.body
  const booking=new Booking(bookingdata)
  booking.user=res.locals.user.id
  booking.startAt=moment(bookingdata.startAt).utc().format()
  booking.endAt=moment(bookingdata.endAt).utc().format()


  if(!checkifbookingdatearevalid(booking)){
    return Booking.sendError(res,{title:'dates error', detail:'starting date  should be lower than ending date'})


  }

   const findbooking=await Booking.find({rental:booking.rental})



   if(!findbooking){
   return Booking.sendError(res,{title:'findbooking error', detail:'booking not created'})
    }

const isvalid=checkifbookingvalid(booking,findbooking)

if(isvalid){

  const savebooking=await booking.
    save()

    if(savebooking){
      return res.json({message:'booking created',startAt:savebooking.startAt,endAt:savebooking.endAt})

    }

}else{
  return Booking.sendError(res,{title:'booking date error',detail:'choosen date already taken'})

}


  }catch(err){
    return Booking.sendError(res,{title:'DB Error',detail:'oops booking something went wrong'})
  }


}

function checkifbookingdatearevalid(booking){
  let isvalid=true
  if(!booking.startAt || !booking.endAt){
    isvalid=false
  }
  if(moment(booking.startAt)> moment(booking.endAt)){
    isvalid=false
  }
  return isvalid
}
function checkifbookingvalid(pendingbooking,findbooking){
  let isvalid=true
  if(findbooking && findbooking.length>0){

    isvalid=findbooking.every(booking=>{
      const pendingstart=moment(pendingbooking.startAt)
      const  pendingend=moment(pendingbooking.endAt)

      const bookingstart=moment(booking.startAt)
      const bookingend=moment(booking.endAt)

      return((bookingstart<pendingstart) &&  bookingend<pendingstart || (pendingend<bookingend && pendingend<bookingstart))

    })


  }
  return isvalid

}

//user booking
exports.getbooking= async(req,res)=>{
  try{
     console.log('1')
    const{rental}=req.query
    console.log('2',rental)
    const query=rental?Booking.find({rental}):Booking.find({})
    console.log('3',query)

    const booking=await query.select('startAt endAt -_id').exec()
    console.log('4',booking)
    return res.json(booking)


  }catch(err){

  return Booking.sendError(res,{title:'DB Error',detail:'oops  user booking cant crated something went wrong'})
  }
}
