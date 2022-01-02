const mongoose = require("mongoose");

const baseballCardSchema = mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  year: { type: String, required: true },
  brand: { type: String, required: true },
  cardNumber: { type: String, required: true },
  grade: { type: String, required: true },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = mongoose.model("BaseballCard", baseballCardSchema);
