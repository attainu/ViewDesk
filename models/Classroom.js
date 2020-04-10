const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ClassroomSchema = new Schema({
    className: { type: String, trim: true, unique: true, required: [true, 'Classname required'] },
    admin: { type: Schema.Types.ObjectId, required: [true, 'Admin required'], ref: 'Admin' },
    professors: [{ type: Schema.Types.ObjectId, ref: 'Professor' }],
    students: [{ type: Schema.Types.ObjectId, ref: 'Student' }],
    date: { type: Date, default: Date.now() },
},
    { timestamps: true })

let Classroom = mongoose.model('Classroom', ClassroomSchema)

module.exports = Classroom