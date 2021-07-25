const usersRouter = require('express').Router();
const User = require('../models/user');
const Product = require('../models/product');
const bcrypt = require('bcrypt');


usersRouter.post('/', async (req, res) => {
	const body = req.body;

	const saltRounds = 10;
	const passwordHash = await bcrypt.hash(body.password, saltRounds);

	const user = new User({
		username: body.username,
		name: body.name,
		passwordHash
	})

	const savedUser = await user.save();

	res.json(savedUser);
})

usersRouter.get('/', async (req, res) => {
	const users = await User.find({}).populate('products');

	res.json(users);
})

usersRouter.put('/product/:id', async (req, res) => {
	const product = await Product.findById(req.params.id);
	const body = req.body;
	const { stock: productStock } = product;
	const { stock: bodyStock } = body;

	// Check if stock was increased
	if ( productStock < bodyStock ){
		res
			.json( { message: "You do not have permission to increase the stock on this product. " } );
	}

	const updatedProduct = {
		stock: bodyStock
	};

	const savedProduct = await Product.findByIdAndUpdate(req.params.id, updatedProduct, { new: true });
	
	res
		.json({
			message: "Product successfully updated!",
			updatedProduct: savedProduct
		});
	


})

module.exports = usersRouter;