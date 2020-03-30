const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const Schema = mongoose.Schema

/**
 *  
 */
const UserSchema = new Schema({
    name: { type: String, required: [true, 'Name required'] },
    email: { type: String, required: [true, 'Email required'] },
    password: { type: String, required: [true, 'password required'] },
    role: { type: String, required: [true, 'role required'] },
    branch: { type: String, default: 'common' },
    profile_pic: { type: String, default: null },
    mobile_number: { type: Number, default: null },
    createdAt: { type: Date, default: Date.now() }
})

// Add a middleware here to check Email already registered before saving them 

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

let User = mongoose.model('user', UserSchema)

module.exports = User