const suppliersRouter = require('express').Router();
const Supplier = require('../models/supplier');

suppliersRouter.get('/', async (req, res) => {
	const suppliers = await Supplier.find({});

	res
		.json(suppliers);
})

suppliersRouter.post('/', async (req, res) => {
	const body = req.body;

	const newSupplier = new Supplier({
		name: body.name
	});

	const savedProduct = await newSupplier.save();

	res
		.json(savedProduct);
})

suppliersRouter.delete('/:id', async (req, res) => {
	const deletedSupplier = await Supplier.findByIdAndRemove(req.params.id);

	res
		.json({
			deletedSupplier,
			message: 'Supplier successfully deleted!'
		})
})

module.exports = suppliersRouter;