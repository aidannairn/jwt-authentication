const express = require('express')

const { getUsers, signupUser } = require('../controllers/Users')

const router = express.Router()

router.get('/users', getUsers)
router.post('/signup', signupUser)

module.exports = { router }