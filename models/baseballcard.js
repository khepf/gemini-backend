const mongoose = require("mongoose");

const baseballCardSchema = mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  year: { type: Number, required: true },
  brand: { type: String, required: true },
  cardNumber: { type: Number, required: true },
  grade: { type: String, required: true },
  buyPrice: { type: String },
  buyDate: { type: String },
  sellPrice: { type: String },
  sellDate: { type: String },
  imagePath: { type: String },
  imageId: { type: String },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = mongoose.model("BaseballCard", baseballCardSchema);
