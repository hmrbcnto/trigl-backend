const express = require('express');
require('express-async-errors');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const logger = require('./utils/logger');
const config = require('./utils/config');
const middleware = require('./utils/middleware');
const productsRouter = require('./controllers/products');
const usersRouter = require('./controllers/users');
const loginRouter = require('./controllers/login');
const categoryRouter = require('./controllers/category');
const subcategoryRouter = require('./controllers/subcategory');
const brandRouter = require('./controllers/brand');
const supplierRouter = require('./controllers/suppliers');

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


// Routers
app.use('/api/products', productsRouter);
app.use('/api/users', usersRouter);
app.use('/api/login', loginRouter);
app.use('/api/categories', categoryRouter);
app.use('/api/subcategories', subcategoryRouter);
app.use('/api/brands', brandRouter);
app.use('/api/suppliers', supplierRouter);

app.use(middleware.errorHandler);
app.use(middleware.unknownEndpoint);

module.exports = app;