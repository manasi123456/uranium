const mongoose = require("mongoose");

const collegeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: "College name is required",
      unique: true,
      trim: true,
    },
    fullName: {
      type: String,
      required: " Full Name of college is required",
    },
    logoLink: {
      type: String,
      required: "logoLnk is required field",
      validate: {
        validator: function (logoLink) {
          return /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/.test(logoLink);
        },
        message: "Enter a valid url",
      },
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = new mongoose.model("College", collegeSchema, "colleges");
