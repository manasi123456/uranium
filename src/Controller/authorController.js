const authorModel = require('../Models/AuthorModel')
var validator = require('email-validator')
var passwordValidator = require('password-validator')

const createAuthor = async (req, res) => {
  try {
    let data = req.body
    let myEmail = req.body.email
    let myFname = req.body.fname
    let myLname = req.body.lname
    let myTitle = req.body.title
    let myPassword = req.body.password
    var schema = new passwordValidator ()
    schema.is().min(8).is().max(100).has().uppercase().has().lowercase().has().digits(2).has().not().spaces().is().not().oneOf(["Passw0rd", "Password123", "myPassword@123"])
    const isPasswordValidate = schema.validate (myPassword)
    console.log(isPasswordValidate)

    if (!myFname) {
      res.status(401).send({error: "fname is missing"})
    }

    if(!myLname) {
      res.status(401).send({error: "lname is missing"})
    }


    if(!myTitle) {
      res.status(401).send({error: "title is not present"})
    }

    if(!(myTitle == "Mrs" || myTitle == "Mr" || myTitle == "Miss")) {
             res.status(401).send({error : "title has to be Mr or Mrs or Miss "})
    }

    if(!myPassword) {
      res.status(401).send({error: "password is missing"})
    }
    
    if (isPasswordValidate === false) {
      res.status(401).send({error : "password isn't validate, please make sure length is minimum 8, should have one uppercase and lowercase character and Number also and donot use space and have a special character"})
    }

    console.log(myEmail)
    let isValidEmail = await validator.validate(myEmail)
    if (!isValidEmail){
      res.status(401).send({error: "email is not valid"})
    }
    let isUniqueEmail = await authorModel.find({email:myEmail })
    console.log(isUniqueEmail)
    if (isUniqueEmail[0]) {
      res.status(401).send({error : "email already exists/ Not unique"})
    }

    let savedData = await authorModel.create(data)
    if (!savedData) {
      res.status(404).send({ msg: 'auther not created' })
    }
    res.status(200).send({ msg: savedData })
  } catch (err) {
    console.log(err.message)
    res.status(500).send({ error: err.message })
  }
}

module.exports = { createAuthor }    
           