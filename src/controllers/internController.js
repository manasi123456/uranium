//Requirements

const mongoose = require("mongoose");
const internModel = require("../models/internModel");

// validators

const isValid = function (value) {
  if (typeof value === "undefined" || value === null) return false;
  if (typeof value === "string" && value.trim().length === 0) return false;
  return true;
};

const isValidRequestBody = function (requestBody) {
  return Object.keys(requestBody).length > 0;
};

const isValidObjectId = function (Objectid) {
  return mongoose.Types.ObjectId.isValid(Objectid);
};

const createIntern = async function (req, res) {
  try {
    const requestBody = req.body;

    // Body Validation

    if (!isValidRequestBody(requestBody)) {
      return res
        .status(400)
        .send({ status: false, message: "Please provide intern details" });
    }

    // Destructuring body

    const { name, email, mobile, collegeId } = requestBody;

    // Validation Starts

    if (!isValid(name)) {
      return res
        .status(400)
        .send({ status: false, message: "Please provide a Name" });
    }

    if (!isValid(email)) {
      return res
        .status(400)
        .send({ status: false, message: "Email is required" });
    }
    let checkEmail = await internModel.findOne({email: requestBody.email })
            if (checkEmail) return res.status(400).send({ msg: "Email already exist" })

    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      return res
        .status(400)
        .send({ status: false, message: "Email is not in correct format" });
    }

    if (!isValid(mobile)) {
      return res
        .status(400)
        .send({ Status: false, message: "Mobile Number is required" });
    }
    let checkMobile = await internModel.findOne({mobile: requestBody.mobile })
            if (checkMobile) return res.status(400).send({ msg: "Mobile Number already exist" })
    

    if (
      !/^(\+\d{1,2}\s?)?1?\-?\.?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/.test(
        mobile
      )
    ) {
      return res
        .status(400)
        .send({
          status: false,
          message: "Mobile Number is not in correct format",
        });
    }

    if (!isValidObjectId(collegeId)) {
      return res
        .status(400)
        .send({ status: false, message: "Enter a valid ObjectId" });
    }

    //Creating Intern

    const intern = await internModel.create(requestBody);

    res
      .status(201)
      .send({
        status: true,
        message: "Intern created successfully",
        data: intern,
      });
  } catch (error) {
    res.status(500).send({ status: false, messsage: error.message });
  }
};

module.exports.createIntern = createIntern;
