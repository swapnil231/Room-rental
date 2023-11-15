/* eslint-env es6 */
/* eslint-disable no-console */
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const config = require("./config/dev");
const rentalroutes = require("./routes/rentals");
const usersroutes = require("./routes/users");
const Rental = require("./models/rental");
const app = express();
const { onlyAuthUser } = require("./controllers/users");
const { provideMongoErrorHandler } = require("./middleware/index");
const bookingoutes = require("./routes/booking");
const { provideMongoErrorHandler2 } = require("./middleware/index");
const imageUploadRoutes = require("./routes/image-upload");
const cloudanaryimage = require("./models/cloudanary-image");
const path = require("path");

const PORT = process.env.PORT || 3001;
mongoose.connect(config.DB_URI).then(() => console.log("connected"));

//middleware
app.use(bodyParser.json());
app.use(provideMongoErrorHandler2);
app.use("/api/v1/image-upload", imageUploadRoutes);

app.get("/api/v1/secret", onlyAuthUser, (req, res) => {
  return res.json({ message: "super secret mesage" });
});

//api routes
app.use("/api/v1/rentals", rentalroutes);

app.use("/api/v1/users/", usersroutes);
app.use("/api/v1/bookings/", bookingoutes);

const distPath = path.join(__dirname, "..", "dist");
console.log(distPath);
app.use(express.static(distPath));
app.get("*", (req, res) => {
  return res.sendFile(path.resolve(distPath, "index.html"));
});

// if (process.env.NODE_ENV === 'production') {
//   const distPath = path.join(__dirname, '..', 'dist');
//   console.log(distPath)
//   app.use(express.static(distPath));
//   app.get('*', (req, res) => {
//     return res.sendFile(path.resolve(distPath, 'index.html'));
//   })
// }

// connecting to server

app.listen(PORT, () => {
  console.log("server is lisening", PORT);
});
