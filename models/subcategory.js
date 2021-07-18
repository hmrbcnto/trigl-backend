const mongoose = require('mongoose');

const subcategorySchema = new mongoose.Schema({
	name: String,
	category: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Category'
	},
	code: String
})

const Subcategory = mongoose.model('Subcategory', subcategorySchema);
module.exports = Subcategory;