const jwt = require('jsonwebtoken')
const BlogModel = require("../Models/BlogModel")

const mid1 = async function (req, res, next){
    let token = req.headers["x-auth-token"]
    if(!token) token = req.headers["x-Auth-token"]

    if (!token) {
        res.status(401).send({error : "no token found"})
    }

    let decodeToken = jwt.verify (token, "functionup-uranium")
    // console.log(decodeToken)
    req.headers["x-auth-token"] = decodeToken

    if (!decodeToken)
    
    {
        res.status(401).send({error : "token is not valid please check your token"})
    }

     let newToken = decodeToken.userId
     console.log(newToken)
    let userToken = req.params.blogsId
    console.log (userToken)

    if (newToken != userToken) {
        res.status(401).send({error : "you are not authourized to change other user document "})
    }

    else next()

}


const mid2 = function ( req, res, next) {
    decodeToken 
}

const blogAuthorization = function (req, res, next) {
    let newToken = decodedToken.userId
    console.log(newToken)
}

module.exports.mid1 = mid1
module.exports.mid2 = mid2
module.exports.blogAuthorization = blogAuthorization 