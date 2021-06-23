const mongoose = require('mongoose')

//Create mongoose schema
const productSchema = new mongoose.Schema({
    name:  String,
    productId: String,
    description: String,
    brand: String,
    price: Number,
    stock: Number,
    suppliers: String,
    image: String,
    image_id: String
})

//Upon being returned to JSON format, change the __id value to id
productSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

//Use schema to create a model
const Product = mongoose.model('Product', productSchema)

//Export
module.exports = Product