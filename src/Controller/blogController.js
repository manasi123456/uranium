const BlogModel = require('../Models/BlogModel')
const authorModel = require('../Models/AuthorModel')

const createBlog = async function (req, res) {
  try {
  let data = req.body
  let checkId = data.authorId
  let myTitle = data.title
  let myBody = data.body
  let myCategory = data.category

  if (!myTitle) {
    res.status(401).send({error : "Title missing"})
  }

  if (myTitle.length<2) {
    res.status(401).send({error : "length of title must be greater than 2"})
  }
 
  if (!myBody) {
    res.status(401).send({error : "Body missing"})  
  }

  if (myBody.length<50) {
    res.status(401).send({error : "length of body must be greater than 50"})
  }

  if (!myCategory){
    res.status(401).send({error: "category is missing"})
  }
  
  console.log(checkId)
  if (!checkId) {
    return res.status(401).send({ msg: 'please enter authorId' })
  }

  let validId = await authorModel.findById(checkId)
  if (!validId) {
    return res.status(401).send({ msg: 'authorId is not correct' })
  }

  let savedData = await BlogModel.create(data)
  res.status(201).send({ data: savedData })
} 
 
catch (err) {
  console.log(err)
  res.status(500).send({ err: err.message })
}
}

const getBlogs = async (req, res) => {
  try {
    let myAuthor = req.query.authorsId
    let myCategory = req.query.category
    if (!myAuthor) {
      res.status(401).send({error : "authorId is not present"})
    }
    // if (!myCategory){
    //   res.status(401).send({error : "category is not present"})
    // }

    if (!(myAuthor.match(/^[0-9a-fA-F]{24}$/))) {
      res.status(401).send({error: "authors Id is not valid"})
      // Yes, it's a valid ObjectId, proceed with `findById` call. 
    }

    let data = await BlogModel.find({ isPublished: true, isDeleted: false })
    console.log(data)
    if (!data) {
      res.status(404).send({ err: 'data not found' }) 
    }
    res.status(200).send({ msg: data })
  } catch (err) {
    console.log(err)
    res.status(500).send({ err: 'server not found' }) 
  }
}

const updateBlog = async (req, res) => {
  try {
    // const { id, tags, subcategory} = Data  and $addtoset
    let Data = req.body
    let Id = req.params.blogsId
    let tags = req.body.tags
    let subcategory = req.body.subcategory
    let user = await BlogModel.findById(Id)
    let updatedTags = user.tags
    if (tags) {
      updatedTags.push(tags)
    }
    // updatedTags.push(tags)
    let updatedSubCategory = user.subcategory
    if (subcategory) {
      updatedSubCategory.push(subcategory)
    }
    // updatedSubCategory.push(subcategory)
    console.log(Data)

    let updatedBlog = await BlogModel.findOneAndUpdate(
      { _id: Id },
      {
        title: Data.title,
        tags : updatedTags,  // don't know why null is coming up in response when you only want to update subcategory
        subcategory: updatedSubCategory, // don't know why null is coming up in response when you update only tags 
        body: Data.body,
      },
      { returnDocument: 'after' },
    )
    console.log(updatedBlog)
    if (!updatedBlog) {
      res.status(404).send({ error: 'Document not found' })
    }
    res.status(200).send({ Updates: updatedBlog })
  } catch (err) {
    console.log(err)
    res.status(500).send({ msg: err.message })
  }
}


const deleteBlog = async (req, res) => {
  try {
    let Id = req.params.blogsId

    if (!(Id.match(/^[0-9a-fA-F]{24}$/))) {
      res.status(401).send({error: "authors Id is not valid"})
      // Yes, it's a valid ObjectId, proceed with `findById` call. 
    }
    // console.log(Id)
    // if (Id.length != 24) {
    //   return res
    //     .status(401)
    //     .send({ error: 'Inavlid Id---Invalid Length of Id' })
    // }
    const isAuthor = authorModel.find({ _id: Id })
    if (!isAuthor) {
      return res
        .status(404)
        .send({ error: 'Inavlid Id---No Author exist with given Id' })
    }

    let deletedDoc = await BlogModel.findOneAndUpdate(
      { _id: Id },
      { isDeleted: true, deletedAt: Date() },
      { returnDocument: 'after' },
    )
    console.log(deletedDoc)
    if (!deletedDoc) {
      res
        .status(404)
        .send({ error: 'Document not found with Given Id/ Id Inavlid' })
    }
    res.status(200).send({ Updates: deletedDoc })
  } catch (err) {
    console.log(err)
    res.status(500).send({ msg: err.message })
  }
}


const deleteByParams = async (req, res) => {
  try {
    let Data = req.query
    let authorsId = Data.authorsId 
    if (!(authorsId.match(/^[0-9a-fA-F]{24}$/))) {
      res.status(401).send({error: "authors Id is not valid"})
      // Yes, it's a valid ObjectId, proceed with `findById` call. 
    }
    
    if (!Data) {
      res.status(404).send({ error: 'Inavlid query---No Data in query' })
    }
    // if (authorsId.length != 24) {
    //   return res
    //     .status(401)
    //     .send({ error: 'Inavlid Id---Invalid Length of Id' })
    // }
    const isAuthor = await authorModel.findById(authorsId)
    if (!isAuthor) {
      return res
        .status(404)
        .send({ error: 'Inavlid Id---No Author exist with given Id' })
    }

    let deletedDoc = await BlogModel.findOneAndUpdate(
      {
        $or: [
          { authorId: authorsId },
          { isPublished: Data.isPublished },
          { tags: Data.tags },
          { category: Data.category },
          { subcategory: Data.subcategory },
        ],
      },
      { isDeleted: true, deletedAt: Date() },
    )
    console.log(deletedDoc)  
    if (!deletedDoc) {
      res
        .status(404)
        .send({ error: 'Document not found / given data not exists' })
      }
      res.status(200).send({ Updates: deletedDoc })
    } catch (err) {
      console.log(err)
      res.status(500).send({ msg: err.message })
    }
  }
  


module.exports.createBlog = createBlog
module.exports.getBlogs = getBlogs
module.exports.updateBlog = updateBlog
module.exports.deleteBlog = deleteBlog
module.exports.deleteByParams = deleteByParams
    