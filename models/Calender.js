const mongoose = require('mongoose')
const Schema = mongoose.Schema

// event Schema
const eventSchema = new Schema({
    event: { type: String, required: true },
    day: { type: String, required: true },
    time: { type: Date, required: true },
    for: { type: String, required: true },
})

// creating & exporting Model
module.exports = {
    Event: mongoose.model('event', eventSchema),

}