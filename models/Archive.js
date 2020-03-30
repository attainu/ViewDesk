const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Add Book Schema
const AddBook = new Schema({
    img: { type: String, required: [true, 'image URL / address required.'] },
    ISBN: { type: Number, required: [true, 'ISBN required'] },
    name: { type: String, required: [true, 'Book name required'] },
    topic: { type: String, required: [true, 'Book topic required'] },
    category: { type: String, required: [true, 'Book Category required'] },
    issued: { type: Boolean, default: false },
    issuedTo: { type: String, default: 'none' },

})

/** add middleware to validate and check duplicate ISBN */
AddBook.pre('save', function (next) {
    next()
})

let Library = mongoose.model('library', AddBook)

module.exports = Library