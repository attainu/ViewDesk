const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const Schema = mongoose.Schema


const UserSchema = new Schema({
    name: { type: String, required: [true, 'Name required'] },
    email: { type: String, required: [true, 'Email required'], trime: true },
    password: { type: String, required: [true, 'password required'] },
    role: { type: String, required: [true, 'role required'], enum: ['admin', 'professor', 'librarian', 'student'] },
    branch: { type: String, required: [true, 'branch required'], enum: ['ME', 'CE', 'EE', 'IT', 'CSE', 'ECE', 'EEE', 'NTS', 'ADMIN'] },
    createdAt: { type: Date, default: Date.now() }
},
    { timestamps: true })

// password hashing middleware
UserSchema.pre('save', function (next) {
    let user = this
    if (!user.isModified('password')) return next()

    // generating the salt
    bcrypt.genSalt(10, (err, salt) => {
        if (err) return next(err)

        // hash password if its modified or new
        bcrypt.hash(user.password, salt, (err, hash) => {
            if (err) return next(err)

            // override the clear text password with hashed one
            user.password = hash
            next()
        })
    })
})

// Admin details
const AdminSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'user' },
    classrooms: [{ type: Schema.Types.ObjectId, ref: 'classroom' }],
    profile_pic: { type: String, default: null },
    contact_no: { type: Number, default: null },
    createdAt: { type: Date, default: Date.now() }
},
    { timestamps: true })

// Professor details
const ProfessorSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'user' },
    classrooms: { type: Schema.Types.ObjectId, ref: 'classroom' },
    profile_pic: { type: String, default: null },
    contact_no: { type: Number, default: null },
    createdAt: { type: Date, default: Date.now() }
},
    { timestamps: true })

// Librarian details
const LibrarianSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'user' },
    profile_pic: { type: String, default: null },
    contact_no: { type: Number, default: null },
    createdAt: { type: Date, default: Date.now() }
},
    { timestamps: true })

// Student details
const StudentSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'user' },
    classrooms: { type: Schema.Types.ObjectId, ref: 'classroom' },
    marksheets: [{ type: Schema.Types.ObjectId, default: null, ref: 'marksheet' }],
    batch: { type: String },
    profile_pic: { type: String, default: null },
    contact_no: { type: Number, default: null },
    parent_email: { type: String, default: null },
    parent_contact_no: { type: Number, default: null },
    createdAt: { type: Date, default: Date.now() },
},
    { timestamps: true })

// models
let User = mongoose.model('user', UserSchema)
let Admin = mongoose.model('admin', AdminSchema)
let Professor = mongoose.model('professor', ProfessorSchema)
let Librarian = mongoose.model('librarian', LibrarianSchema)
let Student = mongoose.model('student', StudentSchema)

User.syncIndexes()

// module export
module.exports = { User, Admin, Professor, Librarian, Student }