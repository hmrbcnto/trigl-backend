const productsRouter = require('express').Router();
const Product = require('../models/product');
const upload = require('../utils/multer');
const cloudinary = require('../utils/cloudinary');
const logger = require('../utils/logger');
const User = require('../models/user');
const Subcategory = require('../models/subcategory');
const Brand = require('../models/brand');
const Category = require('../models/category');
const jwt = require('jsonwebtoken');
const helper = require('../utils/helpers');



productsRouter.post('/', upload.single("image"), async (req, res) => {
		// //Get req body
		// const body = req.body;

		// //Get token
		// const token = helper.getTokenFrom(req);
		// const decodedToken = jwt.verify(token, process.env.SECRET);

		// if(!token || !decodedToken.id){
		// 	return res
		// 					.status(401)
		// 					.json({
		// 						error: "Missing or invalid token"
		// 					})
		// }

		// Try to upload image
		const result = await cloudinary.uploader.upload(req.file.path);
		const body = req.body;

		// Get id of user who sent request
		// const user = await User.findById(decodedToken.id);
		// Hard coded id
		const user = await User.findOne( { username: "Jonas" });
		const subcategory = await Subcategory.findOne( { name: body.subcategory } )
		const category = await Category.findById(subcategory.category);
		const brand = await Brand.findOne( { name: body.brand } );
		const productId = `${category.code}-${subcategory.code}-${body.variation}-${brand.code}`;


		//Create new product
		const product = new Product({
			name: body.name,
			productImage: result.secure_url,
			productId: productId,
			brand: brand._id,
			price: body.price,
			stock: body.stock,
			suppliers: body.suppliers,
			cloudinary_id: result.public_id,
			user:	user._id,
			category: category._id,
			subcategory: subcategory._id
		});

		//Saving product instance
		const savedProduct = await product.save();
		user.products = user.products.concat(savedProduct._id);
		await user.save();
		res.json(savedProduct)
})

productsRouter.put('/:id', upload.single("image"), async(req,res, next) => {

	const body = req.body;
	let updatedProduct;

	// const token = helper.getTokenFrom(req);
	// const decodedToken = jwt.verify(token, process.env.SECRET);


	// if(!token || !decodedToken.id) {
	// 	return res
	// 					.status(401)
	// 					.json(
	// 						{
	// 							error: "Missing or invalid token"
	// 						}
	// 					)
	// }

	const user = await User.findOne( { username: "Jonas" });
	const subcategory = await Subcategory.findOne( { name: body.subcategory } )
	const category = await Category.findById(subcategory.category);
	const brand = await Brand.findOne( { name: body.brand } );
	const productId = `${category.code}-${subcategory.code}-${body.variation}-${brand.code}`;

	//Check if there is an image
	if (req.file) {
			const result = await cloudinary.uploader.upload(req.file.path);
			updatedProduct = {
				name: body.name,
				productImage: result.secure_url,
				productId: productId,
				brand: brand._id,
				price: body.price,
				stock: body.stock,
				suppliers: body.suppliers,
				cloudinary_id: result.public_id,
				user:	user._id,
				category: category._id,
				subcategory: subcategory._id
			}
	} else {
			//Create a product
			updatedProduct = {
				name: body.name,
				productId: productId,
				brand: brand._id,
				price: body.price,
				stock: body.stock,
				suppliers: body.suppliers,
				user:	user._id,
				category: category._id,
				subcategory: subcategory._id
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
	const body = req.body;

	// const token = helper.getTokenFrom(req);
	// const decodedToken = jwt.verify(token, process.env.SECRET);

	// if(!token || !decodedToken.id) {
	// 	return res
	// 					.status(401)
	// 					.json(
	// 						{
	// 							error: "Missing or invalid token"
	// 						}
	// 					)
	// }

	const products = await Product
														.find({})
														.populate('category')
														.populate('subcategory');
	res.json(products);
})

productsRouter.get('/:id', async (req, res) => {
	// const body = req.body;

	// const token = helper.getTokenFrom(req);
	// const decodedToken = jwt.verify(token, process.env.SECRET);


	// if(!token || !decodedToken.id) {
	// 	return res
	// 					.status(401)
	// 					.json(
	// 						{
	// 							error: "Missing or invalid token"
	// 						}
	// 					)
	// }

	const product = await Product.findById(req.params.id)
																	.populate('categories')
																	.populate('subcategories');
	res.json(product);
})

productsRouter.delete('/:id', async (req, res) => {
	// const body = req.body;

	// const token = helper.getTokenFrom(req);
	// const decodedToken = jwt.verify(token, process.env.SECRET);


	// if(!token || !decodedToken.id) {
	// 	return res
	// 					.status(401)
	// 					.json(
	// 						{
	// 							error: "Missing or invalid token"
	// 						}
	// 					)
	// }

		await Product.findByIdAndRemove(req.params.id);
		res
				.json({ message: "Product successfully deleted!"})
				.status(204)
				.end()
})

module.exports = productsRouter;