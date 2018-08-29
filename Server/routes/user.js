const express = require('express')
const UserController = require('../controller/user.js')
const userRouter = express.Router()

UserController(userRouter)

module.exports = userRouter
