const mongoose = require('mongoose')
const Schema = mongoose.Schema

const AttendanceSchema = new Schema({
    token: { type: String, required: [true, 'Attendance link required'] },
    branch: { type: String, required: [true, 'branch name required'] },
    createdBy: { type: Schema.Types.ObjectId, required: [true, 'creator _id required'] },
    date: { type: Date, default: Date.now() }
},
    { timestamps: true })

const PasswordResetSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'user' },
    token: { type: String, required: [true, 'password token required'], trim: true },
    date: { type: Date, default: Date.now() }
},
    { timestamps: true })

let Attendance = mongoose.model('attendance', AttendanceSchema)
let PasswordReset = mongoose.model('passwordRest', PasswordResetSchema)

module.exports = { Attendance, PasswordReset }