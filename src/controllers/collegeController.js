// Requirements

const collegeModel = require("../models/collegeModel");
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

const createCollege = async function (req, res) {
  try {
    const requestBody = req.body;

    // Body Validation

    if (!isValidRequestBody(requestBody)) {
      return res
        .status(400)
        .send({ status: false, message: "Please provide college details" });
    }

    // Destructuring body

    const { name, fullName, logoLink } = requestBody;

    // Validation Starts

    if (!isValid(name)) {
      return res
        .status(400)
        .send({ status: false, message: "Please provide name of the college" });
    }

    let checkName = await collegeModel.findOne({ name: requestBody.name })
            if (checkName) return res.status(400).send({ msg: "College Name already exist" })

    if (!isValid(fullName)) {
      return res.status(400).send({
        status: false,
        message: "Please provide fullName of the college",
      });
    }

    if (!isValid(logoLink)) {
      return res
        .status(400)
        .send({ status: false, message: "url is required" });
    }

    if (!(/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/.test(logoLink))) {
      return res
        .status(400)
        .send({ status: false, message: "url is not in correct format" });
    }



    // Creating College

    const college = await collegeModel.create(requestBody);

    res.status(201).send({
      status: true,
      message: "College successfully created",
      data: college,
    });
  } catch (error) {
    res.status(500).send({ status: false, message: error.message });
  }
};

const listColleges = async (req, res) => {
  try {
    const queryParam = req.query;

    const { collegeName } = queryParam;
    if (!isValid(collegeName)) {
      return res.status(400).send({
        status: false,
        message: "college name is missing in query params",
      });
    }

    const collegeId = await collegeModel
      .findOne({ name: collegeName, isDeleted: false})
      .select({ _id: 1 });
    if (!collegeId) {
      return res.status(404).send({
        status: false,
        message: "There are no colleges found with this name",
      });
    }

    const interns = await internModel
      .find({ collegeId: collegeId, isDeleted: false })
      .select({ name: 1, email: 1, mobile: 1 });
    if (interns.length === 0) {
      interns.push("No interns in this college");
    }

    const collegeDetails = await collegeModel.findOne({
      name: collegeName,
      isDeleted: false,
    });

    let obj = {
      name: collegeDetails.name,
      fullName: collegeDetails.fullName,
      logoLink: collegeDetails.logoLink,
      interests: interns,
    };

    res
      .status(200)
      .send({ status: true, data: obj });
  } catch (error) {
    res.status(500).send({ status: false, message: error.message });
  }
};

module.exports.createCollege = createCollege;
module.exports.listColleges = listColleges;
