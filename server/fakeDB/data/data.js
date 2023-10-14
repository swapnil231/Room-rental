
const mongoose=require('mongoose')

const user1id1=new mongoose.Types.ObjectId()
const user1id2= new mongoose.Types.ObjectId()
 exports.rentals = [{
  title: "Nice view on ocean",
  city: "San Francisco",
  street: "Main street",
  category: "condo",
  image: "https://booksync-jerga-prod.s3.amazonaws.com/uploads/rental/image/5/image.jpeg",
  numOfRooms: 4,
  owner:user1id1,
  shared: true,

  description: "Very nice apartment in center of the city.",
  dailyPrice: 43
},
{
  title: "Modern apartment in center",
  city: "New York",
  street: "Time Square",
  category: "apartment",
  image: "https://booksync-jerga-prod.s3.amazonaws.com/uploads/rental/image/5/image.jpeg",
  numOfRooms: 1,
  shared: false,
  owner:user1id1,
  description: "Very nice apartment in center of the city.",
  dailyPrice: 11
},
{
  title: "Old house in nature",
  city: "Bratislava",
  street: "Letna 7",
  category: "house",
  image: "https://booksync-jerga-prod.s3.amazonaws.com/uploads/rental/image/5/image.jpeg",
  numOfRooms: 5,
  shared: true,
  owner:user1id2,
  description: "Very nice apartment in center of the city.",
  dailyPrice: 23
}]

exports.users=[{
  _id:user1id1,
 username:'test user',
 password:'testtest',
 email:'test@gmail.com'

},{
  _id:user1id2,
  username:'test user2',
  password:'testtest2',
  email:'test2@gmail.com'

}]

