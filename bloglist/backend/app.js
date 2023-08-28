const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const config = require("./utils/config")
const { info, error } = require("./utils/logger")
const blogRouter = require("./controllers/blogs")
const userRouter = require("./controllers/users")
const loginRouter = require("./controllers/login")
const middleware = require("./utils/middleware")

const app = express()

mongoose.connect(config.MONGODB_URI)

app.use(express.static("build"))
app.use(cors())
app.use(express.json())

app.use(middleware.modifyAuthHeader)
// app.use(middleware.userExtractor)

if (process.env.NODE_ENV === "test") {
  const testRouter = require("./controllers/testRouter")
  app.use("/api/testing", testRouter)
}

app.use("/api/users", userRouter)
app.use("/api/blogs", middleware.userExtractor, blogRouter)
app.use("/api/login", loginRouter)

module.exports = app
