const testRouter = require("express").Router()
const Blog = require("../models/blog")
const User = require("../models/user")
const helper = require("../tests/test_helper")

testRouter.post("/reset", async (request, response) => {
  await Blog.deleteMany({})
  await User.deleteMany({})

  response.status(204).end()
})

testRouter.post("/addblogs", async (request, response) => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)

  response.status(200).end()
})

module.exports = testRouter
