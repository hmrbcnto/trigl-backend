const { response } = require('express')
const logger = require('./logger')

//Creates a middleware that shows the method, path, and body of each request
const requestLogger = (request, response, next) => {
    logger.info('Method: ', request.method)
    logger.info('Path: ', request.path)
    logger.info('Body: ', request.body)
    logger.info('---')
    next()
}

//Middleware for unknown endpoints
const unknownEndpoint = () => {
    response.status(404).send( { error: 'Unknown endpoint' } )
}


//Exports
module.exports = { requestLogger, unknownEndpoint }