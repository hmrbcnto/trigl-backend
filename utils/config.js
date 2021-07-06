//Import dotenv
require('dotenv').config()


//Save the variables from the env file
const PORT = process.env.PORT 
const MONGODB_URI = process.env.NODE_ENV === 'test'
											?	process.env.TEST_MONGODB_URI
											: process.env.MONGODB_URI
const CLOUD_NAME = process.env.CLOUD_NAME
const API_KEY = process.env.API_KEY
const API_SECRET = process.env.API_SECRET

//Export
module.exports = {
    PORT,
    MONGODB_URI,
    CLOUD_NAME,
    API_KEY,
    API_SECRET
}