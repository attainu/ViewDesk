const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ClassroomSchema = new Schema({
    className: { type: String },
    admin: { type: Schema.Types.ObjectId, ref: 'Admin' },
    professors: [{ type: Schema.Types.ObjectId, ref: 'Professor' }],
    students: [{ type: Schema.Types.ObjectId, ref: 'Student' }],
    date: { type: Date, default: Date.now() },
},
    { timestamps: true })

let Classroom = mongoose.model('Classroom', ClassroomSchema)

module.exports = Classroom