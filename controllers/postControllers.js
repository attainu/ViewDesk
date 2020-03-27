/** database modules */
require('../models/DB')
const User = require('../models/User')

const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

require('dotenv').config()

let controllers = {}

/**----------------Register & Login controllers---------------- */
controllers.register = (req, res) => {
    let user = new User({ ...req.body })
    user.save()
        .then(credentials => {
            if (credentials)
                res.json({ status: true, message: 'Registration Successfull' })
            else
                res.json({ status: false, message: 'Registration Failed' })
        })
        .catch(err => res.json({ status: false, message: 'Registration Failed', Error: `Database Error: ${err}` }))
}

controllers.login = (req, res) => {
    let Email = req.body.email
    let pwd = req.body.password

    // finding user in DB
    User.findOne({ email: Email })
        .then(user => {
            // comparing password
            bcrypt.compare(pwd, user.password)
                .then(result => {
                    if (result) {
                        // signing payload
                        const payload = { name: user.name, email: user.email, role: user.role }
                        const token = jwt.sign(payload, process.env.JWT_KEY, { expiresIn: '1h' })
                        console.log(jwt.decode(token))
                        res.json({ status: true, message: 'Login Successfull', user: user.role, token: token })
                    }
                    else
                        res.json({ status: false, message: 'Invalid Credentials' })
                })
        })
        .catch(err => res.json({ status: false, message: `User not found. Register first!`, Error: `${err}` }))
}


/**----------------Admin controllers---------------- */
controllers.addClassroom = (req, res) => {
    res.json('Add Classroom')
}

controllers.addUser =  (req, res) => {
    res.json('Add User ( Professor, Librarian, Student )')
}


/**----------------Professor controllers---------------- */
controllers.addEvent = (req, res) => {
    res.json('Add Event')
}

controllers.createMarksheet = (req, res) => {
    res.json('Create Marksheet')
}

controllers.generateAttendance = (req, res) => {
    res.json('Generate Attendance link')
}


/**----------------Librarian controllers---------------- */
controllers.addBook = (req, res) => {
    res.json('Add Books')
}


/**----------------Student controllers---------------- */
controllers.markAttendance = (req, res) => {
    res.json('mark Attendance')
}


// exporting module
module.exports = controllers