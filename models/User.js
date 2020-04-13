const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const Schema = mongoose.Schema

const UserSchema = new Schema({
    active: { type: Boolean, default: false },
    name: { type: String, required: [true, 'Name required'] },
    email: { type: String, trim: true, sparse: true, unique: true, required: [true, 'Email required'] },
    username: { type: String, trim: true, /*sparse: true, unique: true,*/ default: null },
    password: { type: String, required: [true, 'password required'] },
    contact: { type: String, trim: true, default: null, requird: [true, 'contact number required'], /*unique: true, trim: true*/ },
    gender: { type: String, trim: true, enum: ['MALE', 'FEMALE', 'OTHER'], required: [true, 'Gender required'] },
    role: { type: String, trim: true, required: [true, 'role required'], enum: ['ADMIN', 'PROFESSOR', 'LIBRARIAN', 'STUDENT'] },
    branch: { type: String, required: [true, 'branch required'], enum: ['ME', 'CE', 'EE', 'IT', 'CSE', 'ECE', 'EEE', 'NTS', 'ADMIN'] },
    profile_picture: { type: String, default: null }, // <= add some defalut pic like slack have
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
    user: { type: Schema.Types.ObjectId, required: [ true, 'user _id required'], ref: 'User' },
    classrooms: [{ type: Schema.Types.ObjectId, /*unique: true, sparse: true,*/ ref: 'Classroom' }],
    createdAt: { type: Date, default: Date.now() }
},
    { timestamps: true })

// Professor details
const ProfessorSchema = new Schema({
    user: { type: Schema.Types.ObjectId, required: [ true, 'user _id required'], ref: 'User' },
    classrooms: [{ type: Schema.Types.ObjectId, /*unique: true, sparse: true,*/ ref: 'Classroom' }],
    createdAt: { type: Date, default: Date.now() }
},
    { timestamps: true })

// Librarian details
const LibrarianSchema = new Schema({
    user: { type: Schema.Types.ObjectId, required: [ true, 'user _id required'], ref: 'User' },
    createdAt: { type: Date, default: Date.now() }
},
    { timestamps: true })

// Student details
const StudentSchema = new Schema({
    user: { type: Schema.Types.ObjectId, required: [ true, 'user _id required'], ref: 'User' },
    classrooms: [{ type: Schema.Types.ObjectId, /*unique: true, sparse: true,*/ ref: 'Classroom' }],
    marksheets: [{ type: Schema.Types.ObjectId, /*unique: true, sparse: true,*/ ref: 'Marksheet' }],
    parentInfo: {
        email: { type: String, trim: true, },
        contact: { type: String, trim: true, }
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
Admin.syncIndexes()
Professor.syncIndexes()
Librarian.syncIndexes()
Student.syncIndexes()


// module export
module.exports = { User, Admin, Professor, Librarian, Student }