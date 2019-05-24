const mongoose = require('mongoose')
const Schema = mongoose.Schema

const productSchema = new Schema({
    id: String,
    name: String,
    amount: Number,
    factory: String
})

module.exports = mongoose.model('Products', productSchema)