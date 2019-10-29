const Blog = require('../models/Blog')
const errorHandler = require('../utils/errorHandler')

module.exports.getAll = async function(req, res) {
  try {
    const blogs = await Blog.find({user: req.user.id})
    res.status(200).json(blogs)
  } catch (e) {
    errorHandler(res, e)
  }
}

module.exports.getById = async function(req, res) {
  try {
    const blog = await Blog.findById(req.params.id)
    res.status(200).json(blog)
  } catch (e) {
    errorHandler(res, e)
  }
}

module.exports.remove = async function(req, res) {
  try {
    await Blog.remove({_id: req.params.id})
    res.status(200).json({
      message: 'Блог удален.'
    })
  } catch (e) {
    errorHandler(res, e)
  }
}

module.exports.create = async function(req, res) {
  const blog = new Blog({
    name: req.body.name,
    description: req.body.description,
    user: req.user.id,
    imageSrc: req.file ? req.file.path : ''
  })

  try {
    await blog.save()
    res.status(201).json(blog)
  } catch (e) {
    errorHandler(res, e)
  }
}

module.exports.update = async function(req, res) {
  const updated = {
    name: req.body.name,
    description: req.body.description
  }

  if (req.file) {
    updated.imageSrc = req.file.path
  }

  try {
    const blog = await Blog.findOneAndUpdate(
      {_id: req.params.id},
      {$set: updated},
      {new: true}
    )
    res.status(200).json(blog)
  } catch (e) {
    errorHandler(res, e)
  }
}