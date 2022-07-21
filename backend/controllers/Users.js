const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const { connection } = require('../config/Database')

const getUsers = (req, res) => {
  try {
    connection.query(`SELECT User_ID, First_Name, Last_Name, Email FROM jwt_authentication.Users`, (error, result) => {
      if (error) {
        console.log(error)
      } else {
        console.log(result)
      }
    })
  } catch (error) {
    res.status(400).send(`Error retrieving users. ${JSON.stringify(error?.message)}`)
  }
}

const signupUser = (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body
    
    const hashedPassword = bcrypt.hashSync(password, 10)
  
    connection.query(`INSERT INTO jwt_authentication.Users (First_Name, Last_Name, Email, Password) VALUES (?, ?, ?, ?)`, [firstName, lastName, email, hashedPassword])
  
    res.send(`Added ${firstName} ${lastName} as a new user.`)
  } catch (error) {
    res.status(400).send(`Error creating the user. ${JSON.stringify(error?.message)}`)
  }
}

const loginUser = (req, res) => {
  try {
    const { email, password } = req.body
  
    connection.query(`SELECT * FROM jwt_authentication.Users WHERE Email = ?`, [email], (error, result) => {
      if (error) {
        console.log('Error:', error)
        res.send(`Error logging in the user. ${JSON.stringify(error?.message)}`)
      } else {
        if (!result.length) {
          return res.status(401).send('Cannot find user with the given email and password.')
        }
  
        const arePasswordsMatching = bcrypt.compareSync(password, result[0].Password)
  
        if (!arePasswordsMatching) {
          return res.status(401).send('Cannot find user with the given email and password.')
        }
  
        const {
          User_ID: userID,
          First_Name: fName,
          Last_Name: lName,
          Email: email,
        } = result[0]

        const accessToken = jwt.sign({ userID, fName, lName, email }, process.env.ACCESS_TOKEN_SECRET, {
          expiresIn: '15s'
        })

        const refreshToken = jwt.sign({ userID, fName, lName, email }, process.env.REFRESH_TOKEN_SECRET, {
          expiresIn: '1d'
        })

        connection.query(`UPDATE jwt_authentication.Users SET Refresh_Token = "${refreshToken}" WHERE User_ID = ${userID}`)

        res.cookie('refreshToken', refreshToken, {
          httpOnly: true,
          maxAge: 24 * 60 * 60 * 1000
        })

        res.status(200).json({ accessToken })
      }
    })
  } catch (error) {
    console.log('Error:', error)
    res.send(`Error logging in the user. ${JSON.stringify(error?.message)}`)
  }
}

module.exports = { getUsers, signupUser, loginUser }