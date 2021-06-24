const express = require('express');
require('express-async-errors');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const logger = require('./utils/logger');
const config = require('./utils/config');
const middleware = require('./utils/middleware');
const productsRouter = require('./controllers/products');

logger.info('Connecting to ', config.MONGODB_URI);

//Connecting to MongoDB
mongoose.connect(config.MONGODB_URI, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useFindAndModify: false,
	useCreateIndex: true
})
	.then( () => {
		//Displays on successful connect
		logger.info('Connected to MongoDB');
	})
	.catch( (error) => {
		//Displays upon failed connect
		logger.error('Could not connect to MongoDB. Error: ' + error.message);
	})

app.use(cors());
app.use(express.json());
app.use(middleware.requestLogger);

app.use('/api/products', productsRouter);

module.exports = app;