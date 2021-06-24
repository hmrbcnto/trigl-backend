const app = require('./app');
const http = require('http');
const config = require('./utils/config');
const logger = require('./utils/logger');

//Create server
const server = http.createServer(app);

//Listen on port
server.listen(config.PORT, () => {
	logger.info(`Server running on Port ${config.PORT}`);
})