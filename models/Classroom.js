const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ClassroomSchema = new Schema({
    name: { type: String, required: [true, 'classroom name required'] },
    professors: [{ type: String, default: null, ref: 'professor' }],
    students: [{ type: schema.Types.ObjectId, default: null, ref: 'student' }],
    date: { type: Date, default: Date.now() },
},
    { timestamps: true })

let Classroom = mongoose.model('classroom', ClassroomSchema)

module.exports = Classroom