

const {rentals,users} = require('./data/data');
const Rental = require('../models/rental');
const usersmodel=require('../models/users')

class FakeDB {

  async clean() {
  await  Rental.deleteMany({});
  await usersmodel.deleteMany({})

  }

  async addData() {
   await Rental.create(rentals);
   await usersmodel.create(users)
  }

  async populate() {
    await this.clean();
    await this.addData();
  }
}

module.exports = FakeDB;
