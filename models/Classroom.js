const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ClassroomSchema = new Schema({
    className: { type: String },
    admin: { type: Schema.Types.ObjectId, ref: 'admin' },
    professors: [{ type: Schema.Types.ObjectId, ref: 'professor' }],
    students: [{ type: Schema.Types.ObjectId, ref: 'student' }],
    date: { type: Date, default: Date.now() },
},
    { timestamps: true })

let Classroom = mongoose.model('classroom', ClassroomSchema)

module.exports = Classroom