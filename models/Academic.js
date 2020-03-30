const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Curriculum Schema
const TopicSchema = new Schema({
    topic: { type: String, required: [true, 'Topic name required'] },
    tag: { type: String, default: 'common' }
})

/** Add schema.pre() to check duplicate topic entry */

const MarksheetSchema = new Schema({
    /**
     * or add _id instead of stdEmail to keep it unique 
     * this would better for duplicate check.
    */
    name: { type: String, required: [true, 'Student name required'] },
    email: { type: String, required: [true, 'Student Email required'] },
    exam: { type: String, required: [true, 'Exam name required']},
    branch: { type: String, required: [true, 'Student branch reqired'] },
    grade: { type: String, required: [true, 'Grade required'] },
    marks: {
        sub1: { type: Number, mini: 00 },
        sub2: { type: Number, mini: 00 },
        sub3: { type: Number, mini: 00 },
        sub4: { type: Number, mini: 00 },
        sub5: { type: Number, mini: 00 }
    }
})

/** Add schema.pre() to check duplicate marksheet entry */
MarksheetSchema.pre('save', function (next) {
    next()
})

const TimetableSchema = new Schema({
    branch: { type: String, required: [true, 'branch required'] },
    monday: { Lec01: String, Lec02: String, Lec03: String, Lec04: String, Lec05: String, Lec06: String },
    tuesday: { Lec01: String, Lec02: String, Lec03: String, Lec04: String, Lec05: String, Lec06: String },
    wednesday: { Lec01: String, Lec02: String, Lec03: String, Lec04: String, Lec05: String, Lec06: String },
    thursday: { Lec01: String, Lec02: String, Lec03: String, Lec04: String, Lec05: String, Lec06: String },
    friday: { Lec01: String, Lec02: String, Lec03: String, Lec04: String, Lec05: String, Lec06: String },
})

let Curriculum = mongoose.model('curriculum', TopicSchema)
let Marksheet = mongoose.model('marksheet', MarksheetSchema)
let Timetable = mongoose.model('timetable', TimetableSchema)

// exporting Model
module.exports = {
    Curriculum,
    Marksheet,
    Timetable
}