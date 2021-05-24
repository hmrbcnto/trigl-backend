const express = require('express')
require('express-async-errors')
const app = express()
const cors = require('cors')
const middleware = require('./utils/middleware')
const productsRouter = require('./controllers/products')
const mongoose = require('mongoose')
const logger = require('./utils/logger')
const config = require('./utils/config')

logger.info('Connecting to ', config.MONGODB_URI)

//Connects to mongo database
mongoose.connect(config.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
})
    .then(() => {
        //Displays upon successful connect
        logger.info('connected to MongoDB') 
    })
    .catch((error) => {
        //Displays upon failed connect
        logger.error('error connecting to MongoDB: ', error.message)
    })


app.use(cors())
//Uses the built-in express json converter
app.use(express.json())
app.use(middleware.requestLogger)

app.use('/api/products', productsRouter)

module.exports = app