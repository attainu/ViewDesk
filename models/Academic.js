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
    student: { type: Schema.Types.ObjectId, required: [true, 'Student _id required'], ref: 'Student' },
    exam: { type: String, required: [true, 'Exam name required'] },
    sem: { type: Number, required: [true, 'Semester required'], enum: [1, 2, 3, 4, 5, 6, 7, 8] },
    grade: { type: String, required: [true, 'Grade required'], enum: ['A', 'B', 'C', 'D', 'D#', 'F'] },
    marks: {
        sub1: {
            type: Number,
            validate(marks) {
                if (marks < 0 && marks > 100)
                    Error('Mini: 00 and Max: 100')
            }
        },

        sub2: {
            type: Number,
            validate(marks) {
                if (marks < 0 && marks > 100)
                    Error('Mini: 00 and Max: 100')
            }
        },

        sub3: {
            type: Number,
            validate(marks) {
                if (marks < 0 && marks > 100)
                    Error('Mini: 00 and Max: 100')
            }
        },

        sub4: {
            type: Number,
            validate(marks) {
                if (marks < 0 && marks > 100)
                    Error('Mini: 00 and Max: 100')
            }
        },

        sub5: {
            type: Number,
            validate(marks) {
                if (marks < 0 && marks > 100)
                    Error('Mini: 00 and Max: 100')
            }
        }
    },

    date: { type: Date, default: Date.now() }
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
let Result = mongoose.model('marksheet', MarksheetSchema)
let Timetable = mongoose.model('timetable', TimetableSchema)

Curriculum.syncIndexes()
// exporting Model
module.exports = { Curriculum, Result, Timetable }