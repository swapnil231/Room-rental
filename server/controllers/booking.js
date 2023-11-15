/* eslint-env es6 */
/* eslint-disable no-console */
const Booking = require("../models/booking");
const moment = require("moment");
const Rental = require("../models/rental");

exports.createBooking = async (req, res) => {
  try {
    const bookingdata = req.body;
    const booking = new Booking(bookingdata);
    booking.user = res.locals.user.id;
    booking.startAt = moment(bookingdata.startAt).utc().format();
    booking.endAt = moment(bookingdata.endAt).utc().format();

    if (!checkifbookingdatearevalid(booking)) {
      return Booking.sendError(res, {
        title: "dates error",
        detail: "starting date  should be lower than ending date",
      });
    }

    const findbooking = await Booking.find({ rental: booking.rental });

    if (!findbooking) {
      return Booking.sendError(res, {
        title: "findbooking error",
        detail: "booking not created",
      });
    }

    const isvalid = checkifbookingvalid(booking, findbooking);

    if (isvalid) {
      const savebooking = await booking.save();

      if (savebooking) {
        return res.json({
          message: "booking created",
          startAt: savebooking.startAt,
          endAt: savebooking.endAt,
        });
      }
    } else {
      return Booking.sendError(res, {
        title: "booking date error",
        detail: "choosen date already taken",
      });
    }
  } catch (err) {
    return Booking.sendError(res, {
      title: "DB Error",
      detail: "oops booking something went wrong",
    });
  }
};

function checkifbookingdatearevalid(booking) {
  let isvalid = true;
  if (!booking.startAt || !booking.endAt) {
    isvalid = false;
  }
  if (moment(booking.startAt) > moment(booking.endAt)) {
    isvalid = false;
  }
  return isvalid;
}

function checkifbookingvalid(pendingbooking, findbooking) {
  let isvalid = true;
  if (findbooking && findbooking.length > 0) {
    isvalid = findbooking.every((booking) => {
      const pendingstart = moment(pendingbooking.startAt);
      const pendingend = moment(pendingbooking.endAt);

      const bookingstart = moment(booking.startAt);
      const bookingend = moment(booking.endAt);

      return (
        (bookingstart < pendingstart && bookingend < pendingstart) ||
        (pendingend < bookingend && pendingend < bookingstart)
      );
    });
  }
  return isvalid;
}

//user booking
exports.getbooking = async (req, res) => {
  try {
    const { rental } = req.query;
    const query = rental ? Booking.find({ rental }) : Booking.find({});
    const booking = await query.select("startAt endAt -_id").exec();
    return res.json(booking);
  } catch (err) {
    return Booking.sendError(res, {
      title: "DB Error",
      detail: "oops  user booking cant crated something went wrong",
    });
  }
};

exports.getUserbookings = async (req, res) => {
  try {
    const { user } = res.locals;
    const bookings = await Booking.find({ user })
      .populate("user", "-password")
      .populate("rental");
    return res.json(bookings);
  } catch (err) {
    return Booking.sendError(res, {
      title: "booking error",
      detail: " booking for user not found",
    });
  }
};

exports.getRecivedBooking = async (req, res) => {
  try {
    const { user } = res.locals;
    const rentals = await Rental.find({ owner: user }, "_id");

    const rentalIds = rentals.map((r) => r.id);
    const bookings = await Booking.find({ rental: { $in: rentalIds } })
      .populate("user", "-password")
      .populate("rental");

    return res.json(bookings);
  } catch (err) {
    return Booking.sendError(res, {
      title: "booking error",
      detail: "dont recived booking",
    });
  }
};

exports.deleteBooking = async (req, res) => {
  try {
    const days_threshold = 3;
    const { bookingId } = req.params;
    const { user } = res.locals;
    const booking = await Booking.findById(bookingId).populate("user");
    if (user.id !== booking.user.id) {
      return Booking.sendError(res, {
        title: "invalid user",
        detail: "you are not owner of this booking",
      });
    }

    const diff = moment(booking.startAt).diff(moment(), "days");

    if (diff > days_threshold) {
      await booking.deleteOne();
      return res.json({
        message: `booking  of id ${bookingId}has been deleted`,
      });
    } else {
      return Booking.sendError(res, {
        title: "booking error",
        detail: "cant delete booking  3 day before of startdate",
      });
    }
  } catch (err) {
    return Booking.sendError(res, {
      title: "booking error",
      detail: "oops something went wrong",
    });
  }
};
