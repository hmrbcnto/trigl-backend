const productsRouter = require('express').Router()
const { response } = require('express')
const imageProcessing = require("../utils/imgProc")
const Product = require('../models/product')

//Creates a get route for api/products
productsRouter.get('/', async (req, res) => {
    const products = await Product.find({})
    res.json(products)
})

productsRouter.post('/', async (req, res, next) => {
    const body = req.body
    // console.log(body.file)
    // const image = {}
    // image.url = body.file.url;
    // image.id = body.file.public_id;
    // console.log(`image url is ${image.url}
    //                 image id is ${image.id}`)
    const newProduct = new Product({
        name: body.name,
        productId: body.productId,
        description: body.description,
        brand: body.brand,
        price: body.price,
        stock: body.stock,
        suppliers: body.suppliers,
        image: body.file.url
    })


    const savedProduct = await newProduct.save()
    res.status(201).json(savedProduct.toJSON())
})

productsRouter.post('/upload', imageProcessing.upload.single('image'), (req, res) => {
    const body = req.body
    console.log('body')
})

module.exports = productsRouter
