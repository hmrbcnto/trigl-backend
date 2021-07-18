const categoryRouter = require('express').Router();
const Category = require('../models/category');
const logger = require('../utils/logger');

categoryRouter.post('/', async (req, res) => {
	const body = req.body;

	const newCategory = new Category({
		name: body.name,
		code: body.code
	})

	const savedCategory = await newCategory.save();
	res.json(savedCategory);
})

categoryRouter.get('/', async (req, res) => {
	const categories = await Category.find({}).populate('subcategories')
	res.json(categories);
})

categoryRouter.delete('/:id', async (req, res) => {
	await Category.findByIdAndRemove(req.params.id);
	
	res
		.json( { message: 'Delete success!' });
})

module.exports = categoryRouter;
