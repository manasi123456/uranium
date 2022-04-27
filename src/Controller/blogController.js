const BlogModel = require('../Models/BlogModel')
const authorModel = require('../Models/AuthorModel')

const createBlog = async function (req, res) {
    try {
  let data = req.body
  let checkId = data.authorId
  console.log(checkId)
  if (!checkId) {
    return res.send({ msg: 'please enter authorId' })
  }
  let validId = await authorModel.findById(checkId)
  if (!validId) {
    return res.send({ msg: 'authorId is not correct' })
  }

  let savedData = await BlogModel.create(data)
  res.status(201).send({ data: savedData })
} catch (err) {
    console.log(err)
    res.status(500).send({ err: 'server not found' })
  }
}

const getBlogs = async (req, res) => {
  try {
    let myquery = req.query
    let data = await BlogModel.find({isPublished: true, isDeleted: false });
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
    let Data = req.body
    let Id = req.params.blogsId
    console.log(Data)

    let updatedBlog = await BlogModel.findOneAndUpdate(
      { _id: Id },
      {
        title: Data.title,
        tags: Data.tags,
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
    console.log(Id)

    let deletedDoc = await BlogModel.findOneAndUpdate(
      { _id: Id },
      { isDeleted: true, deletedAt: Date() },
      { returnDocument: 'after' },
    )
    console.log(deletedDoc)
    if (!deletedDoc) {
      res.status(404).send({ error: 'Document not found' })
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
    console.log(Data)
    let deletedDoc = await BlogModel.findOneAndUpdate(
      {
        $or: [{ authorId: Data.authorsId }, { isPublished: Data.isPublished }],
      },
      { isDeleted: true, deletedAt: Date() },
    )
    console.log(deletedDoc)
    if (!deletedDoc) {
      res.status(404).send({ error: 'Document not found' })
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
