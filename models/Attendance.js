const mongoose = require('mongoose')
const Schema = mongoose.Schema

const AttendanceLinkSchema = new Schema({
    link: { type: String, required: [true, 'Attendance link required'] },
    branch: { type: String, required: [true, 'branch name required'] },
    createdBy: { type: String, required: [true, 'creator _id required'] },
    date: { type: Date, default: Date.now() }
},
    { timestamps: true })

let AttendanceLink = mongoose.model('attendance', AttendanceLinkSchema)

module.exports = {
    AttendanceLink
}