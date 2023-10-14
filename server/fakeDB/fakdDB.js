

const {rentals,users,images} = require('./data/data');
const Rental = require('../models/rental');
const usersmodel=require('../models/users')
const booking=require('../models/booking')
const CloudinaryImage = require('../models/cloudanary-image');


class FakeDB {

  async clean() {
  await  Rental.deleteMany({});
  await usersmodel.deleteMany({})
  await booking.deleteMany({})
  await CloudinaryImage.deleteMany({});

  }

  async addData() {
   await Rental.create(rentals);
   await usersmodel.create(users)
   await CloudinaryImage.create(images);
  }

  async populate() {
    await this.clean();
    await this.addData();
  }
}

module.exports = FakeDB;
