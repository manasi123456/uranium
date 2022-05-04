const mongoose = require("mongoose")
const collegeModel = require("./collegeModel")
const ObjectId = mongoose.Schema.Types.ObjectId

const internSchema = new mongoose.Schema({
    name: {
        type : String,
        required: "name is required field"
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        validate: {
            validator : function (email) {
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
            },
            message: "Enter a valid email address"
        },
    },
    mobile: {
        type: String,
        trim: true,
        unique: true,
        validate: {
            validator : function(mobile) {
                return /^(\+\d{1,2}\s?)?1?\-?\.?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/.test(mobile)
            },
            message:"Enter a valid mobile number"
        },
    },
    collegeId: {
        type: ObjectId,
        ref: "College",
        required: "CollegeId is a required field"
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
}, {timestamps: true})


module.exports = new mongoose.model("Intern", internSchema, "interns")