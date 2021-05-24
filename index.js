const app = require('./app')
const http = require('http')
const config = require('./utils/config')
const logger = require('./utils/logger')

//Creates a server using the 'app' express instance
const server = http.createServer(app)


//Server now listens on given port
server.listen(config.PORT, () => {
    logger.info(`Server running on Port ${config.PORT}`)
})