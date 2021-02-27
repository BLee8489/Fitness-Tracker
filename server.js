// adding dependencies
const express = require("express");
const mongoose = require("mongoose");
const logger = require("morgan");
const dotenv = require("dotenv").config();

const app = express();
app.use(logger("dev"));

const PORT = process.env.PORT || 3000;

// setting up middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// connecting to database
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

// connecting routes
require("./routes/html-routes");
require("./routes/api-routes");


app.listen(PORT, () => {
    console.log(`App running on PORT http://localhost:${PORT}`);
});