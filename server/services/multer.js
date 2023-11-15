/* eslint-env es6 */
/* eslint-disable no-console */

const multer = require("multer");
const storage = multer.memoryStorage();

const ALLOWED_FORMAT = ["image/jpeg", "image/png", "image/jpg", "image/avif"];

const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    if (ALLOWED_FORMAT.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("NOT supported file Format"), false);
    }
  },
});
module.exports = upload;
