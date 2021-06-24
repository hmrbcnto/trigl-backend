const cloudinary = require('cloudinary');
const config = require('./config');

cloudinary.config({
	cloud_name: config.CLOUD_NAME,
	api_key: config.API_KEY,
	api_secret: config.API_SECRET
});

module.exports = cloudinary;