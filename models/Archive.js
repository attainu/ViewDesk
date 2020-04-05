const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Add Book Schema
const AddBook = new Schema({
    coverUrl: { type: String, default: null },// <= replace default: null with required: [true, 'cover URL required.']
    ISBN: { type: String, required: [true, 'ISBN required'], trim: true, unique: true },
    name: { type: String, required: [true, 'Book name required'], trim: true },
    topic: { type: String, required: [true, 'Book topic required'], trim: true },
    category: { type: String, required: [true, 'Book Category required'], trim: true },
    issued: { type: Boolean, default: false },
    issuedTo: { type: Schema.Types.ObjectId, default: null, ref: 'User' },
    issuedBy: { type: Schema.Types.ObjectId, default: null, ref: 'Librarian' }
})

/** middleware to validate ISBN */
AddBook.pre('save', function (next) {

    next()
    /** variables */
    /**let ISBN = this.toUpperCase()
    let len = ISBN.length()
    let last = ISBN.charAt(len - 1)
    let sum = 0
    let n = 10*/
})

let Library = mongoose.model('Library', AddBook)

module.exports = Library