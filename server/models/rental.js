/* eslint-env es6 */
/* eslint-disable no-console */
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const rentalSchema = new Schema({
  title: {
    type: String,
    required: true,
    maxlength: [128, "invalid lenght! maxlenght is 128 charactor"],
  },
  city: { type: String, required: true, lowercase: true },
  street: {
    type: String,
    required: true,
    lowercase: true,
    minLenght: [4, "invalid lenght! minlenght is 4 charactor"],
  },
  category: { type: String, required: true, lowercase: true },
  numOfRooms: { type: Number, required: true },
  description: { type: String, required: true },
  dailyPrice: { type: Number, required: true },
  shared: String,
  owner: { type: Schema.ObjectId, ref: "Register" },
  image: { type: Schema.Types.ObjectId, ref: "CloudinaryImage" },

  createdAt: { type: Date, default: Date.now },
});

rentalSchema.methods.sendError = function (res, config) {
  const { status, detail } = config;
  return res.status(status).send({
    errors: [{ title: "Rental Error!", detail: detail }],
  });
};

module.exports = mongoose.model("Rental", rentalSchema);
