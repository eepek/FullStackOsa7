const blogsRouter = require("express").Router()
const Blog = require("../models/blog")
const User = require("../models/user")
const jwt = require("jsonwebtoken")
const config = require("../utils/config")
const { userExtractor } = require("../utils/middleware")
const { request } = require("express")

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 })
  response.json(blogs)
})

blogsRouter.get("/:id", async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  response.json(blog)
})

blogsRouter.post("/", async (request, response) => {
  const user = request.user
  if (!user) {
    return response.status(401).json({ Error: "Unauthorized" }).end()
  }
  const blog = new Blog(request.body)

  blog.user = user._id

  //Tällä tavalla server response antaa suoraan user olion eikä pelkää id:tä
  blog.populate("user", { username: 1, name: 1 })
  try {
    let savedBlogEntry = await blog.save()

    response.status(201).json(savedBlogEntry)
    user.blogs = user.blogs.concat(savedBlogEntry._id)
    await user.save()
  } catch (error) {
    //console.log(error)
    return response.status(400).end()
  }
})

blogsRouter.delete("/:id", async (request, response) => {
  //console.log('Delete')
  const user = request.user
  const blog = await Blog.findById(request.params.id)
  // //console.log(user._id.toString())
  if (!user || blog.user._id.toString() !== user._id.toString()) {
    return response
      .status(401)
      .json({ Error: "Unauthorized, token not found or invalid token" })
      .end()
  } else {
    //console.log(blog)
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  }
})

blogsRouter.put("/:id", async (request, response) => {
  let updatedBlog = await {
    title: request.body.title,
    author: request.body.author,
    url: request.body.url,
    comments: request.body.comments,
    likes: request.body.likes,
  }

  let modified = await Blog.findByIdAndUpdate(request.params.id, updatedBlog, {
    new: true,
  })
  response.status(200).json(modified)
})

blogsRouter.post("/:id/comments", async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  blog.comments.push(request.body.comment)
  const modified = await Blog.findByIdAndUpdate(request.params.id, blog, {
    new: true,
  })
  response.status(200).json(modified)
})

module.exports = blogsRouter
