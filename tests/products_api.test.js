const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const api = supertest(app);
const helper = require('../utils/testHelper');
const Product = require('../models/product');


beforeEach( async () => {
	await Product.deleteMany({});
	
	helper.initialProducts.forEach( async (product) => {
		let productObject = new Product(product);
		await productObject.save();
	})
	
})

test('notes are returned as json', async () => {
	await api
					.get('/api/products')
					.expect(200)
					.expect('Content-Type', /application\/json/)
})

test('there are two products', async () => {
	const response = await api.get('/api/products');

	expect(response.body).toHaveLength(2);
})

test('a specific note is returned', async () => {
	const response = await api.get('/api/products');

	const contents = response.body.map(r => r.name);
	expect(contents).toContain(
		'Sample Product 1'
	)
})

afterAll(() => {
	mongoose.connection.close();
})