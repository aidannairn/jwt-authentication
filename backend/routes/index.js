const express = require('express')

const { getUsers, signupUser, loginUser, logoutUser } = require('../controllers/Users')

const router = express.Router()

router.get('/users', getUsers)
router.post('/signup', signupUser)
router.put('/login', loginUser)
router.delete('/logout', logoutUser)

module.exports = { router }