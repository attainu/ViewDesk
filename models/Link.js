const mongoose = require('mongoose')
const Schema = mongoose.Schema

const AttendanceLinkSchema = new Schema({
    token: { type: String, required: [true, 'Attendance link required'] },
    classroom: { type: String, required: [true, 'classroom name required'], ref: 'classroom'},
    createdBy: { type: Schema.Types.ObjectId, required: [true, 'creator _id required'], ref: 'professor' },
    date: { type: Date, default: Date.now() }
},
    { timestamps: true })

const PasswordResetSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'user' },
    token: { type: String, required: [true, 'password token required'], trim: true },
    date: { type: Date, default: Date.now() }
},
    { timestamps: true })

let AttendanceLink = mongoose.model('attendance', AttendanceLinkSchema)
let PasswordReset = mongoose.model('passwordRest', PasswordResetSchema)

module.exports = { AttendanceLink, PasswordReset }