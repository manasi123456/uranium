const jwt = require('jsonwebtoken')
const blogModel = require("../models/blogModel")


const authentication = async function (req, res, next) {
    let token = req.headers["x-api-key" || "X-Api-Key"]
    if (!token) {
        res.status(401).send({ error: "no token found" })
    }

    let decodeToken = jwt.verify(token, "functionup-uranium")
    
    if(!decodeToken){
        res.send({error:"Invalid token"})
    }
    next();

}

const deleteandUpdateBlogById=async(req,res,next)=>{
    let token = req.headers["x-api-key" || "X-Api-Key"]
    let decodedToken = jwt.verify(token,"functionup-uranium")
    let Id = req.params.blogsId
    if(Id.length!=24){
        res.status(401).send({ error: "invalid Id " })
    }
    let blog = await blogModel.findById(Id)
    // console.log(blog)
    if(!blog){
        res.status(404).send({ error: "document not found " })
    }
    console.log(decodedToken.userId)
    if(blog.authorId!=decodedToken.userId){
        res.status(401).send({ error: "you are not authourized to change other user document" })
    }
    next()
}

const deleteBlogbyParams= async (req,res,next)=>{
     let token = req.headers["x-api-key" || "X-Api-Key"]
     let decodedToken = jwt.verify(token,"functionup-uranium")
     let { authorsId, isPublished, tags, category, subcategory } = req.query
<<<<<<< HEAD
     let blog = await blogModel.find({$or:[{authorId:authorsId},{isPublished:isPublished},{tags:tags}, {category:category}, {subcategory:subcategory}]})
     if(blog[0].authorId!=decodedToken.userId){
         res.status(401).send({ error: "you are not authourized to change other user document " })
=======
     let blog = await blogModel.findOne({authorId : decodedToken.userId, $or:[{authorId:authorsId},{isPublished:isPublished},{tags:tags}, {category:category}, {subcategory:subcategory}]})
    
     if (!blog){
        res.status(404).send({ error: "either authorsId or attribute is incorrect/ you are not authourized / there is no document with this key value for this user logged in" })
>>>>>>> a3706893abcf9e83615fc6440c33bfb816287795
     }
 
     next()
} 


module.exports.deleteBlogbyParams = deleteBlogbyParams
module.exports.authentication = authentication
module.exports.deleteandUpdateBlogById = deleteandUpdateBlogById
