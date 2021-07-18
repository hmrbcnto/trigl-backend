const brandRouter = require('express').Router();
const Brand = require('../models/brand');


brandRouter.get('/', async (req, res) => {
	const brands = await Brand.find({});
	res
		.json(brands);
})

brandRouter.post('/', async (req, res) => {
	const { name, code } = req.body;
	const newBrand = new Brand({
		name,
		code
	})

	const savedBrand = await newBrand.save();

	res	
		.json(savedBrand)
		.status(200);
})

brandRouter.delete('/:id', async (req, res) => {
	await Brand.findByIdAndRemove(req.params.id);

	res
		.json({
			message: "Deleted brand!"
		})
})

module.exports = brandRouter;