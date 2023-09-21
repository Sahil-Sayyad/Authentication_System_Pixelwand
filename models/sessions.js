const mongoose = require("mongoose");

const sessionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, "Please add User Id"],
    },
    token: {
      type: String,
      required: [true, "Please add email Token"],
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Session", sessionSchema);