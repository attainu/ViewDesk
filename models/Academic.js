const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Curriculum Schema
const TopicSchema = new Schema({
    subject: { type: String, required: [true, 'Topic name required'] },
    branch: { type: String, required: [true, 'Branch required'] },
    sem: { type: Number, required: [true, 'Semester required'] },
    time: { type: Date, default: Date.now() }
},
    { timestamps: true })

// Marksheet Schema
const MarksheetSchema = new Schema({
    /**
     * or add _id instead of stdEmail to keep it unique 
     * this would better for duplicate check.
    */
    name: { type: Schema.Types.ObjectId, required: [true, 'Student name required'], ref: 'user' }, // <= get email, branch from user object
    exam: { type: String, required: [true, 'Exam name required'] },
    grade: { type: String, required: [true, 'Grade required'] },
    marks: {
        sub1: {
            type: Number, mini: 00,
            validate(marks) {
                if (marks > 100)
                    Error('Maximum marks: 100')
            }
        },

        sub2: {
            type: Number, mini: 00,
            validate(marks) {
                if (marks > 100)
                    Error('Maximum marks: 100')
            }
        },

        sub3: {
            type: Number, mini: 00,
            validate(marks) {
                if (marks > 100)
                    Error('Maximum marks: 100')
            }
        },

        sub4: {
            type: Number, mini: 00,
            validate(marks) {
                if (marks > 100)
                    Error('Maximum marks: 100')
            }
        },

        sub5: {
            type: Number, mini: 00,
            validate(marks) {
                if (marks > 100)
                    Error('Maximum marks: 100')
            }
        }
    },
},
    { timestamps: true })

// time table Schema
const TimetableSchema = new Schema({
    branch: { type: String, required: [true, 'branch required'] },
    monday: { Lec01: String, Lec02: String, Lec03: String, Lec04: String, Lec05: String, Lec06: String },
    tuesday: { Lec01: String, Lec02: String, Lec03: String, Lec04: String, Lec05: String, Lec06: String },
    wednesday: { Lec01: String, Lec02: String, Lec03: String, Lec04: String, Lec05: String, Lec06: String },
    thursday: { Lec01: String, Lec02: String, Lec03: String, Lec04: String, Lec05: String, Lec06: String },
    friday: { Lec01: String, Lec02: String, Lec03: String, Lec04: String, Lec05: String, Lec06: String },
},
    { timestamps: true })

let Curriculum = mongoose.model('curriculum', TopicSchema)
let Marksheet = mongoose.model('marksheet', MarksheetSchema)
let Timetable = mongoose.model('timetable', TimetableSchema)

Curriculum.syncIndexes()
// exporting Model
module.exports = { Curriculum, Marksheet, Timetable }