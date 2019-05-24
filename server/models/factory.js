const mongoose = require('mongoose')
const Schema = mongoose.Schema

const factorySchema = new Schema({
    id: String,
    name: String,
    location: String
})

module.exports = mongoose.model('Factories', factorySchema)