const jwt = require('jsonwebtoken')
const { connection } = require('../config/Database')

const refreshToken = (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken

    if (!refreshToken) return res.sendStatus(401)

    connection.query(`SELECT User_ID, First_Name, Last_Name, Email FROM Users WHERE Refresh_Token = "${refreshToken}"`, (error, result) => {
      if (error) {
        console.log('Error:', error)
      } else {
        if (!result[0]) return res.sendStatus(403)

        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
          if (err) return res.sendStatus(403)

          const {
            User_ID: userID,
            First_Name: fName,
            Last_Name: lName,
            Email: email
          } = result[0]

          const accessToken = jwt.sign({ userID, fName, lName, email }, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: '15s'
          })
          res.json({ accessToken })
        })
      }
    })
  } catch (error) {
    console.log('Error:', error)
  }
}

module.exports = { refreshToken }