const jwt = require('jsonwebtoken')
const BlogModel = require("../Models/BlogModel")

const mid1 = async function (req, res, next){
    let token = req.headers["x-auth-token"]
    if(!token) token = req.headers["x-Auth-token"]

    if (!token) {
        res.status(401).send({error : "no token found"})
    }

    let decodeToken = jwt.verify (token, "functionup-uranium")
     req.headers["decodedToken"] = decodedToken

    if (!decodeToken) {
        res.status(401).send({error : "token is not valid please check you token"})
    }

    else next()
}


const mid2 = async function (req, res, next){
    updateUser = req.params.blogsId
    decodeUser = req.headers.decodeToken.userId

    if (decodeUser !== updateUser ) {
        res.status(401).send({error : "you are not authorized to change other user document"})
    } 
     next()
}

module.exports.mid1 = mid1
module.exports.mid2 = mid2