const mongoose = require('mongoose')
const Schema = mongoose.Schema

const AttendanceLinkSchema = new Schema({
    token: { type: String, required: [true, 'Attendance link required'] },
    classroom: { type: String, required: [true, 'classroom name required'], ref: 'Classroom' },
    createdBy: { type: Schema.Types.ObjectId, required: [true, 'creator _id required'], ref: 'Professor' },
    date: { type: Date, default: Date.now() }
},
    { timestamps: true })

const PasswordResetSchema = new Schema({
    userId: { type: String, trim: true, required: [true, 'userId required'] },
    token: { type: String, trim: true, required: [true, 'password token required'] },
    date: { type: Date, default: Date.now() }
},
    { timestamps: true })

const UserConfirmSchema = new Schema({
    userId: { type: String, required: [true, 'userId required'] },
    token: { type: String, required: [true, 'password token required'] },
    date: { type: Date, default: Date.now() }
},
    { timestamps: true })

let AttendanceLink = mongoose.model('AttendanceLink', AttendanceLinkSchema)
let PasswordReset = mongoose.model('PasswordRest', PasswordResetSchema)
let UserConfirm = mongoose.model('UserConfirm', UserConfirmSchema)

module.exports = { AttendanceLink, PasswordReset, UserConfirm }