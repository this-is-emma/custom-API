const mongoose = require('mongoose')

const quoteSchema = new mongoose.Schema({
    body:{ type: String, required: true},
    //tag: { type: String, required: true},
    author: {type: String},
    dateAdded: {type: Date, required: true, default: Date.now }
})

module.exports = mongoose.model('quote', quoteSchema)