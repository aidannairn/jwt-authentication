const { connection } = require('../config/Database')

const getUsers = (req, res) => {
  try {
    connection.query(`SELECT User_ID, FirstName, LastName, Email FROM jwt_authentication.Users`, (error, result) => {
      if (error) {
        console.log(error)
      } else {
        console.log(result)
      }
    })
  } catch (error) {
    console.log(error)
  }
}

module.exports = { getUsers }