const express = require('express')
const router = express.Router()
const blogController = require('../Controller/blogController')
const authorController = require('../Controller/authorController')

router.post('/authors', authorController.createAuthor)

router.post('/blogs', blogController.createBlog)

router.get('/getblogs', blogController.getBlogs)

router.put('/blogs/:blogsId', blogController.updateBlog)

router.put('/deleteblogs/:blogsId', blogController.deleteBlog)

router.put('/delete', blogController.deleteByParams)

module.exports = router    
   