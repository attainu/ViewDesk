const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ClassroomSchema = new Schema({
    className: { type: String },
    professors: [{ type: Schema.Types.ObjectId, default: null, ref: 'professor' }],
    students: [{ type: Schema.Types.ObjectId, default: null, ref: 'student' }],
    date: { type: Date, default: Date.now() },
},
    { timestamps: true })

let Classroom = mongoose.model('classroom', ClassroomSchema)

module.exports = Classroom