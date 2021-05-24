//Import dotenv
require('dotenv').config()


//Save the variables from the env file
const PORT = process.env.PORT
const MONGODB_URI = process.env.MONGODB_URI


//Export
module.exports = {
    PORT,
    MONGODB_URI
}