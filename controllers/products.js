const productsRouter = require('express').Router();
const Product = require('../models/product');
const upload = require('../utils/multer');
const cloudinary = require('../utils/cloudinary')


productsRouter.get('/hello', async(req, res) => {
	res.send('Hello World');
})

productsRouter.post('/', upload.single("image"), async (req, res) => {

		// Try to upload image
		const result = await cloudinary.uploader.upload(req.file.path);

		//Create new product
		const product = new Product({
			name: req.body.name,
			productImage: result.secure_url,
			productId: req.body.productId,
			description: req.body.description,
			brand: req.body.brand,
			price: req.body.price,
			stock: req.body.stock,
			suppliers: req.body.suppliers,
			cloudinary_id: result.public_id
		});

		//Saving user instance
		const savedProduct = await product.save();
		res.json(savedProduct)
})

productsRouter.get('/', async (req, res) => {
		const products = await Product.find();
		res.json(products);
})

productsRouter.get('/:id', async (req, res) => {
	const product = await Product.findById(req.params.id);
	res.json(product);
})

productsRouter.delete('/:id', async (req, res) => {
		await Product.findByIdAndRemove(req.params.id);
		res.status(204).end()
})

module.exports = productsRouter;