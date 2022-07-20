const express = require('express')

const { getUsers } = require('../controllers/Users')

const router = express.Router()

router.get('/users', getUsers)

module.exports = { router }