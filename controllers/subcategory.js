const subcategoryRouter = require('express').Router();
const Subcategory = require('../models/subcategory');
const Category = require('../models/category');

subcategoryRouter.post('/', async (req, res) => {
	const body = req.body;
	const currentCategory = await Category.findOne({ name: body.category });
	console.log(currentCategory);

	const newSubcat = new Subcategory({
		name: body.name,
		code: body.code,
		category: currentCategory._id
	})


	const savedSubcat = await newSubcat.save();
	currentCategory.subcategories = currentCategory.subcategories.concat(savedSubcat._id);
	

	await currentCategory.save();
	res.json(savedSubcat);
})

subcategoryRouter.get('/', async (req, res) => {
	const subcategories = await Subcategory.find({}).populate('category');

	res.json(subcategories);
})

subcategoryRouter.delete('/:id', async (req, res) => {
	await Subcategory.findByIdAndRemove(req.params.id);

	res
		.json( { message: "Delete success!" } );
})

module.exports = subcategoryRouter;