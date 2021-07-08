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

//Middleware for misc errors
const errorHandler = (error, req, res, next) => {
	if (error.name === 'CastError'){
		return res
						.status(400)
						.send({
							error: "Malformatted ID"
						})
	}
	else if (error.name === 'ValidationError'){
		return res
						.status(400)
						.json({
							error: error.message
						})
	}
	else if (error.name === 'JsonWebTokenError'){
		return res
						.status(401)
						.json({
							error: 'Invalid token'
						})
	}
	else if (error.name === 'TokenExpiredError'){
		return res
						.status(401)
						.json({
							error: 'Token expired'
						})
	}

	logger.error(error.message)
	next(error)
}


//Exports
module.exports = { requestLogger, unknownEndpoint, errorHandler }