const mongoose = require('mongoose');

const supplierSchema = new mongoose.Schema({
	name: String,
	products: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Products'
		}
	],
	linkedPrices: Number
})

const Supplier = mongoose.model('Supplier', supplierSchema);
module.exports = Supplier;