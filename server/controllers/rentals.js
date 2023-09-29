



const Rental=require('../models/rental')

exports.getRentals=async (req,res)=>{
  try{
  const data= await Rental.find()
     if(data){
      return res.json(data)
    }
  }catch(err){
    return new Rental().sendError(res,{status:422,detail:'cant retrive data'})

  }

 }
exports.getRentalsById=async (req,res)=>{
  try{
    const {rentalId}=req.params
    const rental=  await Rental.findById(rentalId)

    if(rental){
      return res.json(rental)
    }
  } catch(err){
    return new Rental().sendError(res,{status:422,detail:'cant retrive databyId'})
  }
}
exports.creatRentals=async(req,res)=>{
 try{
    const rentalData=req.body
    const newRental=new Rental(rentalData)

    const creatRental= await newRental.save()

    if(creatRental){
      return res.json({message:`rental with id:${creatRental._id} was added`})
    }

   } catch(err){
      return new Rental().sendError(res,{status:422,detail:'cant retrive  post data'})
    // return res.status(422).send({
    //   errors:[{title:'Rental Error!',message:'cannot retrive Rental data'}]
    //  })
   }

}


exports.deletRentals=(req,res)=>{
  const {rentalId}=req.params
  const rentalIndex =rentals.findIndex((el)=>el._id===rentalId)
  rentals.splice(rentalIndex,1)
  return res.json({message:`rental with id:${rentalId} is delated`})

}
exports.updateRentals=(req,res)=>{
  const {rentalId}=req.params
  const rentalToupdate=req.body
  const rentalIndex =rentals.findIndex((el)=>el._id===rentalId)
  rentals[rentalIndex].city=rentalToupdate.city
  rentals[rentalIndex].title=rentalToupdate.title

  return res.json({message:`rental with id:${rentalId} is updated`})

}
