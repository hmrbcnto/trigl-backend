const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
	name: String,
	productImage: String,
	productId: String,
	description: String,
	brand: String,
	price: Number,
	stock: Number,
	suppliers: String,
	cloudinary_id: String,
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	}
});

// productSchema.set('toJSON', {
// 	transform: (document, returnedObject) => {
// 		returnedObject.id = returnedObject.returnedObject._id.toString();
// 		delete returnedObject._id;
// 		delete returnedObject.__v;
// 	}
// })

const Product = mongoose.model('Product', productSchema);
module.exports = Product; 