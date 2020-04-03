const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ClassroomSchema = new Schema({
    classname: { type: String },
    professors: [{ type: Schema.Types.ObjectId, default: null, ref: 'professor' }],
    students: [{ type: Schema.Types.ObjectId, default: null, ref: 'student' }],
    date: { type: Date, default: Date.now() },
},
    { timestamps: true })

let College = mongoose.model('college', ClassroomSchema)

module.exports = College