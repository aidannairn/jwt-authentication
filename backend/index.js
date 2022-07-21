const express = require('express')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const dotenv = require('dotenv')

const { router } = require('./routes')

dotenv.config()
const app = express()

app.use(cors({ credentials:true, origin: process.env.CORS_ORIGIN }))
app.use(cookieParser())
app.use(express.json())
app.use(router)

const port = 4000
app.listen(port, () => console.log('Server running on port', port))