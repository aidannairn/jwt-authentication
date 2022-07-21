const express = require('express')

const { getUsers, signupUser, loginUser } = require('../controllers/Users')

const router = express.Router()

router.get('/users', getUsers)
router.post('/signup', signupUser)
router.post('/login', loginUser)

module.exports = { router }