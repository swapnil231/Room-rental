const { ObjectId } = require("mongodb");
const Rental = require("../models/rental");
const Booking = require("../models/booking");

exports.getRentals = async (req, res) => {
  try {
    const city = req.query.city;
    const query = city ? { city: city.toLowerCase() } : {};
    const data = await Rental.find(query).populate("image");
    return res.json(data);
  } catch (err) {
    return new Rental().sendError(res, {
      status: 422,
      detail: "cant retrive data",
    });
  }
};

exports.getUserRentals = async (req, res) => {
  try {
    const { user } = res.locals;
    const rentals = await Rental.find({ owner: user }).populate("image");

    if (rentals) {
      return res.json(rentals);
    }
  } catch (err) {
    return new Rental().sendError(res, {
      status: 422,
      detail: "cant find  users rentals",
    });
  }
};

exports.getRentalsById = async (req, res) => {
  try {
    const { rentalId } = req.params;
    const rental = await Rental.findById(rentalId).populate("image");
    const owner = await rental.populate("owner", "username");
    if (owner) {
      return res.json(owner);
    }
  } catch (err) {
    return new Rental().sendError(res, {
      status: 422,
      detail: "cant retrive databyId",
    });
  }
};
exports.creatRentals = async (req, res) => {
  try {
    const rentalData = req.body;
    rentalData.owner = res.locals.user;
    const newRental = new Rental(rentalData);

    const creatRental = await newRental.save();

    if (creatRental) {
      return res.json({
        message: `rental with id:${creatRental._id} was added`,
      });
    }
  } catch (err) {
    return new Rental().sendError(res, {
      status: 422,
      detail: "cant retrive post data",
    });
  }
};

exports.deletRentals = (req, res) => {
  const { rentalId } = req.params;
  const rentalIndex = rentals.findIndex((el) => el._id === rentalId);
  rentals.splice(rentalIndex, 1);
  return res.json({ message: `rental with id:${rentalId} is delated` });
};
exports.updateRentals = (req, res) => {
  const { rentalId } = req.params;
  const rentalToupdate = req.body;
  const rentalIndex = rentals.findIndex((el) => el._id === rentalId);
  rentals[rentalIndex].city = rentalToupdate.city;
  rentals[rentalIndex].title = rentalToupdate.title;

  return res.json({ message: `rental with id:${rentalId} is updated` });
};

// middlewear
exports.isuserRentalowner = async (req, res, next) => {
  try {
    const { rental } = req.body;
    const user = res.locals.user;

    if (!rental) {
      return new Rental().sendError(res, {
        status: 422,
        detail: "cant make booking on undefined rental",
      });
    }
    const findrentalid = await Rental.findById(rental);
    const populaterental = await findrentalid.populate("owner");
    const ownerid = populaterental.owner.id;

    if (ownerid == user.id) {
      return new Rental().sendError(res, {
        status: 422,
        detail: "cant creat booking on your own rentals",
      });
    }
    next();
  } catch (err) {
    return new Rental().sendError(res, {
      status: 422,
      detail: "oops something went wrong",
    });
  }
};

exports.deleteRental = async (req, res) => {
  try {
    const { rentalId } = req.params;
    const { user } = res.locals;
    const rental = await Rental.findById(rentalId).populate("owner");

    const booking = await Booking.find({ rental });

    if (user.id !== rental.owner.id) {
      return new Rental().sendError(res, {
        status: 422,
        detail: "invalid user you not owner of rental",
      });
    }

    if (booking && booking.length > 0) {
      return new Rental().sendError(res, {
        status: 422,
        detail: "cant delete active booking rental",
      });
    }
    await rental.deleteOne();
    return res.json({ message: `rental  of id ${rentalId}has been deleted` });
  } catch (err) {
    return new Rental().sendError(res, {
      status: 422,
      detail: "oops something went wrong",
    });
  }
};

//updaterental
exports.updateRental = async (req, res) => {
  try {
    const rentaldata = req.body;

    const { user } = res.locals;
    const { rentalId } = req.params;
    const rental = await Rental.findById(rentalId)
      .populate("owner")
      .populate("image");

    if (user.id !== rental.owner.id) {
      return new Rental().sendError(res, {
        status: 422,
        detail: "invalid user you not owner of rental",
      });
    }

    //  toprint validation error
    const validate = rental.set(rentaldata);
    const validatedModel = validate.validateSync();
    if (!!validatedModel) throw validatedModel;

    await rental.save();
    const Updatedrental = await Rental.findById(rentalId)
      .populate("owner")
      .populate("image");
    return res.status(200).send(Updatedrental);
  } catch (err) {
    return res.mongoError(err);
  }
};

// verifyuser

exports.verifyuser = async (req, res) => {
  try {
    const { user } = res.locals;
    const { rentalId } = req.params;
    const rental = await Rental.findById(rentalId).populate("owner");

    if (user.id !== rental.owner.id) {
      return new Rental().sendError(res, {
        status: 422,
        detail: "invalid user you not owner of rental",
      });
    }

    return res.json({ message: `user is verified` });
  } catch (err) {
    return new Rental().sendError(res, {
      status: 422,
      detail: "oops something went wrong cant verify user",
    });
  }
};
