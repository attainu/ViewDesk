/** database modules */

// TESTING CODE
const mongoose = require('mongoose')
//-----------
require('../models/DB')
const { User, PasswordReset } = require('../models/User')
const Library = require('../models/Archive')
const { AttendanceLink } = require('../models/Attendance')
const { Curriculum, Marksheet } = require('../models/Academic')

/** packages & modules */
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const reqTokenDecoder = require('../utils/reqTokenDecoder')
const mailer = require('../utils/mailer')

require('dotenv').config()

let controllers = {}

/**---------------------------------------------------Register & Login controllers----------------------------------------------------*/
controllers.register = (req, res) => {

    // getting user details from requrest body
    const user = req.body

    let userObj = {
        name: user.name,
        email: user.email,
        password: user.password,
        role: user.role
    }

    // adding user to DB
    let newUser = new User({ ...userObj })
    newUser.save()
        .then(credentials => {
            if (credentials)
                res.json({ status: true, message: 'Registration Successfull' })
            else
                res.json({ status: false, message: 'Registration Failed' })
        })
        .catch(err => res.json({ status: false, message: 'Registration Failed', Error: `${err}` }))
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

                        // payload
                        const payload = {
                            id: user._id,
                            name: user.name,
                            email: user.email,
                            role: user.role,
                            branch: user.branch
                        }

                        // generating token
                        const token = jwt.sign(payload, process.env.JWT_KEY, { expiresIn: '1h' })

                        res.json({ status: true, message: 'Login Successfull', user: user.role, token: token })
                    }
                    else
                        res.json({ status: false, message: 'Invalid Credentials' })
                })
        })
        .catch(err => res.json({ status: false, message: `User Not Found. Register first!`, Error: `${err}` }))
}


/**---------------------------------------------------Admin controllers----------------------------------------------------*/
controllers.addUser = (req, res) => {
    /**
    * alteration needed
    * need to create another schema for other users
    */

    // adding user to DB
    let user = new User({ ...req.body })
    user.save()
        .then(created => {
            if (created)
                res.json({ status: true, message: 'Registration Successfull' })
            else
                res.json({ status: false, message: 'Registration Failed' })
        })
        .catch(err => res.json({ status: false, message: 'Registration Failed', Error: `${err}` }))
}


controllers.removeUser = (req, res) => {
    /**
     * to be completed.
     */
    res.json('Remove User')
}


/**---------------------------------------------------Professor controllers----------------------------------------------------*/
controllers.curriculum = (req, res) => {

    // Adding topic to the curriculum
    let topic = new Curriculum(...req.body)
    topic.save()
        .then(result => {
            if (result)
                res.json({ status: true, message: 'topic added to curriculum' })
            else
                res.json({ status: false, message: 'failed to add topic' })
        })
        .catch(err => res.json({ status: false, message: 'failed to add topic', Error: `${err}` }))
}

controllers.createMarksheet = (req, res) => {
    /**
     * Aletration needed
     * pass a list of registered students along with JSON response,
     * this would be easier for professor to get student names.
     */
}

/** need to be done
 * after google calendar integration
 */
controllers.addEvent = (req, res) => {
    res.json('Add Event')
}


controllers.generateAttendance = (req, res) => {

    /**
     * its a BETA version, modification needed.
     */

    // for which branch attendance need to be created
    let branch = req.params.branch

    // fetching user's info from request token
    const data = reqTokenDecoder()
    const link = jwt.sign(data, process.env.JWT_KEY, { expiresIn: '10m' })

    // Attendance link info
    let linkInfo = {
        link: link,
        branch: branch,
        createdBy: user.id,
    }

    // storing attendance link info in DB
    let newLink = new AttendanceLink(...linkInfo)
    newLink.save()
        .then(result => {
            if (result)
                res.json({ status: true, message: 'Attendance created!' })
            else
                res.json({ status: false, message: 'Attendance not created' })
        })
        .catch(err => res.json({ status: false, message: 'Fail to create Attendance', error: err }))
}


/**---------------------------------------------------Librarian controllers----------------------------------------------------*/
controllers.addBook = (req, res) => {

    /**
     * Schema:- ISBN, name, topic, category,
     */
    let bookData = req.body
    let newBook = new Library(...bookData)
    newBook.save()
        .then(confirmation => {
            if (confirmation)
                res.json({ status: true, message: 'Book added to Library' })
            else
                res.json({ status: false, message: 'Failed to add Book' })
        })
        .catch(err => res.json({ status: false, message: 'Failed to add Book', Error: `${err}` }))
}


/**---------------------------------------------------Student controllers----------------------------------------------------*/
/** need to be done */
controllers.markAttendance = (req, res) => {
    res.json('Mark Attendance')
    /**
     * message: 'NO SESSION FOUND!' if active link not found for the session
     * message: 'Attendance marked!' if attendance marked
     */

    // jwt - iat, exp

    // fetching user's info from request token
    const data = reqTokenDecoder()

    // setting user branch
    let userBranch = data.branch
    AttendanceLink.find({ branch: userBranch })
        .then(link => {
            if (link) {
                const data = jwt.verify(link, process.env.JWT_KEY)

                if (data) {
                    const { iat, exp } = data
                    const time = (exp - iat) / 60 // calculating validity duration
                    res.json({ status: true, message: 'link ACTIVE', validity: time })
                }
                else
                    res.json({ status: false, message: 'link EXPIRED' })
            }
            else
                res.json({ status: false, message: 'NO SESSION FOUND' })
        })
        .catch(err => res.json({ status: false, message: 'NO SESSION FOUND', error: err }))
}


/**---------------------------------------------------Common controllers----------------------------------------------------*/
controllers.resetPassword = (req, res) => {

    // getting user input from request body
    const userPwd = req.body.password
    const newPassword = req.body.newPassword

    // getting request token from headers
    const data = reqTokenDecoder(req)

    // finding user
    User.findById(data.id)
        .then(doc => {

            // comparing password with hash
            bcrypt.compare(userPwd, doc.password)
                .then(response => {
                    if (response) {

                        // updating password
                        User.update({ _id: doc.id }, { $set: { password: newPassword } }, { new: true })
                            .then(response => {
                                if (response)
                                    res.json({ status: true, message: 'Password changed successfully' })
                                else
                                    res.json({ status: false, message: 'Failed to change password' })
                            })
                            .catch(err => res.json({ status: true, message: 'Failed to change password', error: err }))
                    } else
                        res.json({ status: false, message: 'wrong password' })
                })
                .catch(err => res.json({ status: false, message: 'Wrong password', error: err }))
        })
        .catch(err => res.json({ status: true, message: 'User not found', error: err }))
}

controllers.forgotPassword = (req, res) => {

    const userEmail = req.body.email

    // getting requrest token
    const data = reqTokenDecoder(req)
    
    User.findById('5e8465758469ba1a9c3c5834')
        .then(doc => {

            // comparing user email
            if (doc.email === userEmail) {

                // user payload
                let userInfo = {
                    id: doc.id,
                    email: doc.email,
                    role: doc.role,
                    branch: doc.branch
                }

                // generating password reset token & storing it in DB for further validation
                const token = jwt.sign(userInfo, process.env.JWT_KEY, { expiresIn: '10m' })
                let info = {
                    user: doc.id,
                    token: token
                }
                let newToken = new PasswordReset(...info)
                newToken.save()

                // password reset link
                const resetLink = `/api/${doc.role}/resetPassword/:${token}`
                // mail this link to registered email using nodemailer


                /**----delete this code after setting nodemailer----*/
                res.json({ status: true, message: 'Reset token generated', token: token })
                //---------------------------------------------------
            }
            else
                res.json({ status: false, message: 'Can not generate reset link. Enter registered email address' })
        })
        .catch(err => res.json({ status: false, message: 'User Not Found', error: err }))
}


controllers.setForgotPassword = (req, res) => {

    // getting new password
    newPassword = req.body.password

    // getting request headers
    const data = reqTokenDecoder(req)

    const token = req.body.query

    // finding token in DB
    PasswordReset.findOne({ _id: data.id })
        .then(doc => {

            // comparing the sent token with saved one
            if (doc.token == token) {

                // verfiying token validity
                jwt.verify(token, process.env.JWT_KEY)
                    .then(response => {

                        // finding user by id and updating password
                        User.findByIdAndUpdate({ _id: response.id }, { $set: { password: newPassword } }, { new: true })
                            .then(response => {
                                if (response)
                                    res.json({ status: true, message: 'password updated successfully' })
                                else
                                    res.json({ status: false, message: 'fail to update password' })
                            })
                            .catch(err => res.json({ status: false, message: 'Fail to update password', error: err }))
                    })
                    .catch(err => res.json({ status: false, message: 'reset link expired', error: err }))
            }
            else
                res.json({ status: false, message: 'link tempered' })
        })
        .catch(err => res.json({ status: false, message: 'reset link not found' }))
}

// exporting module
module.exports = controllers