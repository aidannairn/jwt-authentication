const express = require('express')

const { refreshToken } = require('../controllers/RefreshToken')
const { verifyToken } = require('../middleware/VerifyToken')
const { getUsers, signupUser, loginUser, logoutUser } = require('../controllers/Users')

const router = express.Router()

router.get('/users', verifyToken, getUsers)
router.post('/signup', signupUser)
router.put('/login', loginUser)
router.get('/token', refreshToken)
router.delete('/logout', logoutUser)

module.exports = { router }