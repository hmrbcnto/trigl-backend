const productsRouter = require('express').Router();
const Product = require('../models/product');
const upload = require('../utils/multer');
const cloudinary = require('../utils/cloudinary');
const logger = require('../utils/logger');



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

productsRouter.put('/:id', upload.single("image"), async(req,res, next) => {

	const body = req.body;
	let updatedProduct;

	console.log(req.file);

	//Check if there is an image
	if (req.file) {
		console.log(`Shit i'm here`);
			const result = await cloudinary.uploader.upload(req.file.path);
			updatedProduct = {
				name: body.name,
				productImage: result.secure_url,
				productId: body.productId,
				description: body.description,
				brand: body.brand,
				price: body.price,
				stock: body.stock,
				suppliers: body.suppliers
			}
	} else {
			//Create a product
			updatedProduct = {
				name: body.name,
				productImage: body.image,
				productId: body.productId,
				description: body.description,
				brand: body.brand,
				price: body.price,
				stock: body.stock,
				suppliers: body.suppliers
	}
	}
	
	//Save change
	Product.findByIdAndUpdate(req.params.id, updatedProduct, { new: true })
		.then(updatedNote => {
			res.json(updatedNote)
		})
		.catch(error => next(error))

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
		res
				.json({ message: "Product successfully deleted!"})
				.status(204)
				.end()
})

module.exports = productsRouter;