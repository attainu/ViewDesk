const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const Schema = mongoose.Schema

const UserSchema = new Schema({
    name: { type: String, required: [true, 'Name required'] },
    email: { type: String, required: [true, 'Email required'], trime: true },
    password: { type: String, required: [true, 'password required'] },
    contact: { type: Number, requird: [true, 'contact number required'], unique: true },
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
const AdminSchema = new User({
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    classrooms: [{ type: Schema.Types.ObjectId, unique: true, ref: 'Classroom' }],
    profile_picture: { type: String, default: null },
    createdAt: { type: Date, default: Date.now() }
},
    { timestamps: true })

// Professor details
const ProfessorSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    classrooms: { type: Schema.Types.ObjectId, ref: 'Classroom' },
    profile_picture: { type: String, default: null },
    createdAt: { type: Date, default: Date.now() }
},
    { timestamps: true })

// Librarian details
const LibrarianSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    profile_picture: { type: String, default: null },
    createdAt: { type: Date, default: Date.now() }
},
    { timestamps: true })

// Student details
const StudentSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    classrooms: { type: Schema.Types.ObjectId, ref: 'Classroom' },
    marksheets: [{ type: Schema.Types.ObjectId, default: null, ref: 'Marksheet' }],
    batch: { type: String },
    profile_picture: { type: String, default: null },
    parentInfo: {
        email: { type: String },
        contact: { type: Number }
    },
    createdAt: { type: Date, default: Date.now() },
},
    { timestamps: true })

// models
let User = mongoose.model('User', UserSchema)
let Admin = mongoose.model('Admin', AdminSchema)
let Professor = mongoose.model('Professor', ProfessorSchema)
let Librarian = mongoose.model('Librarian', LibrarianSchema)
let Student = mongoose.model('Student', StudentSchema)

User.syncIndexes()

// module export
module.exports = { User, Admin, Professor, Librarian, Student }