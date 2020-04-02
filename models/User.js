const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const Schema = mongoose.Schema


const UserSchema = new Schema({
    name: { type: String, required: [true, 'Name required'], trim: true },
    email: { type: String, required: [true, 'Email required'], trime: true },
    password: { type: String, required: [true, 'password required'] },
    role: { type: String, required: [true, 'role required'], enum: ['admin', 'professor', 'librarian', 'student', 'common'] },
    branch: { type: String, required: [true, 'branch required'], enum: ['ME', 'CE', 'EE', 'IT', 'CSE', 'ECE', 'EEE', 'admin', 'lib'] },
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

const AdminSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'user' },
    profile_pic: { type: String },
    contact_no: { type: Number }
})

const ProfessorSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'user' },
    profile_pic: { type: String },
    contact_no: { type: Number }
})

const LibrarianSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'user' },
    profile_pic: { type: String },
    contact_no: { type: Number },
})

const StudentSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'user' },
    batch: { type: String },
    profile_pic: { type: String },
    contact_no: { type: Number },
    parent_email: { type: String },
    parent_contact_no: { type: Number }
})

const PasswordResetSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'user' },
    token: { type: String, required: [true, 'password token required'], trim: true },
    date: { type: Date, default: Date.now() }
})

//post() hook for changing the expired status to true after user leaves it.
//PasswordResetSchema.post()

let User = mongoose.model('user', UserSchema)
let Admin = mongoose.model('admin', AdminSchema)
let Professor = mongoose.model('professor', ProfessorSchema)
let Librarian = mongoose.model('librarian', LibrarianSchema)
let Student = mongoose.model('student', StudentSchema)
let PasswordReset = mongoose.model('passwordRest', PasswordResetSchema)

User.syncIndexes()

module.exports = { User, Admin, Professor, Librarian, Student, PasswordReset }