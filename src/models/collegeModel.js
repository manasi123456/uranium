const mongoose = require("mongoose")

const collegeSchema = new mongoose.Schema({
    name: {
        type: String,
        required:"College name is required",
        unique: true,
        trim: true
    },
    fullName: {
        type: String,
        required: " Full Name of college is required"
    },
    logoLink: {
        type: String,
        required: "logoLnk is required field"
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
}, {timestamps: true})


module.exports = new mongoose.model("College", collegeSchema, "colleges")