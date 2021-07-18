const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
	name: String,
	code: String,
	subcategories: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Subcategory'
		}
	]
})

categorySchema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString();
		delete returnedObject._id;
		delete returnedObject.__v;
	}
})

const Category = mongoose.model('Category', categorySchema);
module.exports = Category;