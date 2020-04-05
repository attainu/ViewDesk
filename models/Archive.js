const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Add Book Schema
const AddBook = new Schema({
    coverUrl: { type: String, required: [true, 'cover URL required.'] },
    ISBN: { type: String, required: [true, 'ISBN required'], trim: true },
    name: { type: String, required: [true, 'Book name required'] },
    topic: { type: String, required: [true, 'Book topic required'] },
    category: { type: String, required: [true, 'Book Category required'] },
    issued: { type: Boolean, default: false },
    issuedTo: { type: Schema.Types.ObjectId, ref: 'User' },
    issuedBy: { type: Schema.Types.ObjectId, ref: 'Librarian'}
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