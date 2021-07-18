const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
	name: String,
	productImage: String,
	productId: String,
	price: Number,
	stock: Number,
	suppliers: [
		{
			type: String
		}
	],
	cloudinary_id: String,
	brand: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Brand'
	},
	category: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Category'
	},
	subcategory: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Subcategory'
	},
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	}
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product; 