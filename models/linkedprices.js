const mongoose = require('mongoose');

const linkedPricesSchema = new mongoose.Schema({
	product: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Product'
	},
	supplier: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Supplier'
	},
	price: Number
});

const LinkedPrice = mongoose.model('LinkedPrice', linkedPricesSchema);

module.exports = LinkedPrice;