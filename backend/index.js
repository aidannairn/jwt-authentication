const express = require('express')
const cookieParser = require('cookie-parser')
const cors = require('cors')

const { router } = require('./routes')

const app = express()

app.use(cors())
app.use(cookieParser())
app.use(express.json())
app.use(router)

const port = 4000
app.listen(port, () => console.log('Server running on port', port))