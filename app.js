const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const postsRoutes = require("./routes/posts");
const userRoutes = require("./routes/user");
const baseballCardsRoutes = require("./routes/baseballcards");
// require("dotenv").config();
const cloudinary = require("cloudinary").v2;

const app = express();

mongoose
  .connect(
    "mongodb+srv://gemini:" +
      process.env.MONGO_ATLAS_PW +
      "@gcsandboxcluster.wiugq.mongodb.net/geminidb?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Connected to database!");
  })
  .catch((err) => {
    console.log("Houston we have a problem! " + err);
  });
app.enable("trust proxy");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/images", express.static(__dirname + "/images"));
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, PUT, OPTIONS"
  );
  next();
});

app.use("/api/baseballcards", baseballCardsRoutes);
app.use("/api/posts", postsRoutes);
app.use("/api/user", userRoutes);

module.exports = app;
