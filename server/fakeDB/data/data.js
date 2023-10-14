
const mongoose=require('mongoose')

const user1id1=new mongoose.Types.ObjectId()
const user1id2= new mongoose.Types.ObjectId()



const image1Id = new mongoose.Types.ObjectId();
const image2Id =new mongoose.Types.ObjectId();
const image3Id = new mongoose.Types.ObjectId();

exports.images = [
  {
    _id: image1Id,
    cloudinaryId: 'photo-1502672260266-1c1ef2d93688_httybn',
    url: 'https://res.cloudinary.com/daninai72/image/upload/v1697126018/photo-1502672260266-1c1ef2d93688_httybn.avif'
  },
  {
    _id: image2Id,
    cloudinaryId: 'img3_q9miin',
    url: 'https://res.cloudinary.com/daninai72/image/upload/v1697126414/img3_q9miin.avif'
  },
  {
    _id:image3Id,
    cloudinaryId: 'image3_agfjva',
    url: 'https://res.cloudinary.com/daninai72/image/upload/v1697126440/img2_hpjtyh.avif'
  }
]

 exports.rentals = [{
  title: "Nice view on ocean",
  city: "San Francisco",
  street: "Main street",
  category: "condo",
  // image: "https://booksync-jerga-prod.s3.amazonaws.com/uploads/rental/image/5/image.jpeg",
  image: image1Id,
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
  // image: "https://booksync-jerga-prod.s3.amazonaws.com/uploads/rental/image/5/image.jpeg",
  image: image2Id,
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
  // image: "https://booksync-jerga-prod.s3.amazonaws.com/uploads/rental/image/5/image.jpeg",
  image: image3Id,
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

