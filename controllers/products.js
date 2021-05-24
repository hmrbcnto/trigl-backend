const productsRouter = require('express').Router()
const { response } = require('express')
const Product = require('../models/product')


//Creates a get route for api/products
productsRouter.get('/', async (req, res) => {
    const products = await Product.find({})
    res.json(products)
})

productsRouter.post('/', async (req, res) => {
    const body = req.body
    const newProduct = new Product({
        name: body.name,
        productId: body.productId,
        description: body.description,
        brand: body.brand,
        price: body.price,
        stock: body.stock,
        suppliers: body.suppliers
    })

    const savedProduct = newProduct.save()
    res.json(savedProduct)
})

module.exports = productsRouter
