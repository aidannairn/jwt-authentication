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
  
    connection.query(`INSERT INTO Users (First_Name, Last_Name, Email, Password) VALUES (?, ?, ?, ?)`, [firstName, lastName, email, hashedPassword])
  
    res.send(`Added ${firstName} ${lastName} as a new user.`)
  } catch (error) {
    res.status(400).send(`Error creating the user. ${JSON.stringify(error?.message)}`)
  }
}

module.exports = { getUsers, signupUser }