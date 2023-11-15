/* eslint-env es6 */
/* eslint-disable no-console */
const express = require("express");
const router = express.Router();
const { onlyAuthUser } = require("../controllers/users");

const upload = require("../services/multer");

const singlupload = upload.single("foo");
const Booking = require("../models/booking");

const DatauriParser = require("datauri/parser");
const parser = new DatauriParser();
const { cloudUpload } = require("../services/cloudanary");
const CloudinaryImage = require("../models/cloudanary-image");

const singleUploadController = (req, res, next) => {
  try {
    console.log(52);
    singlupload(req, res, (error) => {
      if (error) {
        return Booking.sendError(res, {
          title: "upload error",
          detail: "uolod error",
        });
      }
      next();
    });
  } catch (err) {
    return Booking.sendError(res, {
      title: "upload error",
      detail: "oops something went wrong cant upload image",
    });
  }
};

uploadimage = async (req, res) => {
  try {
    if (!req.file) {
      return Booking.sendError(res, {
        title: "image error",
        detail: "image not presented",
      });
    }

    // converting to base64
    const buffer = req.file.buffer;
    parser.format(".png", buffer);

    // sending to cloudanary
    const result = await cloudUpload(parser.content);

    const cImage = new CloudinaryImage({
      url: result.secure_url,
      cloudinaryId: result.public_id,
    });

    const savedImage = await cImage.save();
    return res.json({
      _id: savedImage.id,
      url: savedImage.url,
      message: "file uplodeed sucessfully",
    });
  } catch (err) {
    return Booking.sendError(res, {
      title: "upload error",
      detail: "oops something went wrong with image",
    });
  }
};
router.post("", onlyAuthUser, singleUploadController, uploadimage);

module.exports = router;
