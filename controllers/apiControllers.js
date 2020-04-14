/** database modules */
require('../models/DB')
const { User, Admin, Professor, Librarian, Student } = require('../models/User')
const Library = require('../models/Archive')
const { AttendanceLink, PasswordReset } = require('../models/Link')
const { Curriculum, Result } = require('../models/Academic')

/** packages & modules */
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const reqTokenDecoder = require('../utils/reqTokenDecoder')
const mailer = require('../utils/mailer')
const saveUser = require('../utils/saveUser')

require('dotenv').config('../.env')

let controllers = {}

/**---------------------------------------------------Register & Login controllers----------------------------------------------------*/
controllers.adminRegister = (req, res) => {

    // getting user details from requrest params
    const user = req.body

    // validating Admin PIN
    if (user.pin != process.env.PIN) return res.json({ status: false, message: 'Invalid PIN' })

    // user object
    let userObj = {
        active: true,
        name: user.name,
        email: user.email,
        password: user.password,
        contact: user.contact,
        gender: user.gender,
        role: 'ADMIN',
        branch: 'ADMIN'
    }

    // adding user to DB
    let newUser = new User(userObj)
    newUser.save()
        .then(user => {

            let newAdmin = new Admin({ user: user.id })
            newAdmin.save()
                .then(info => {

                    if (info)
                        res.status(200).json({ status: true, message: 'Registration Successfull' })
                    else
                        res.json({ status: false, message: 'Registration Failed' })
                })
        })
        .catch(err => res.json({ status: false, message: 'Registration Failed', err }))
}

controllers.login = (req, res) => {

    // getting login details from request body
    const email = req.body.email
    const password = req.body.password

    // finding user in DB
    User.findOne({ email: email })
        .then(user => {

            // checking for Activation
            if (user.active === false) return res.json({ status: false, message: 'Activation required!' })

            // comparing password
            bcrypt.compare(password, user.password)
                .then(result => {

                    console.log(result)
                    if (result) {

                        // user payload
                        const payload = {
                            id: user._id,
                            name: user.name,
                            email: user.email,
                            role: user.role,
                            branch: user.branch
                        }

                        // generating token
                        const token = jwt.sign(payload, process.env.JWT_KEY, { expiresIn: '24h' })

                        res.status(200).json({ status: true, message: 'Login Successfull', user: user.role, token: token })
                    }
                    else
                        res.json({ status: false, message: 'Invalid Credentials' })
                })
        })
    .catch(err => res.json({ status: false, message: `User Not Found. Register first!`, Error: `${err}` }))
}


/**---------------------------------------------------Admin controllers----------------------------------------------------*/
controllers.register = (req, res) => {

    // getting user details from requrest params
    const user = req.body

    // adding user to DB
    let newUser = new User(user)
    newUser.save()
        .then(docs => {

            // registered user documents
            const { _id: id, role } = docs

            // mailing data
            const data = {
                userId: id,
                email: user.email,
                password: user.password
            }

            // mailing login credentials with user activation link
            mailer('login', user.email, data)

            /** user specified information */
            if (role == 'ADMIN')
                saveUser(res, docs)

            else if (role == 'PROFESSOR')
                saveUser(res, docs)

            else if (role == 'LIBRARIAN')
                saveUser(res, docs)

            else if (role == 'STUDENT')
                saveUser(res, docs)
        })
        .catch(err => res.json({ status: false, message: 'Registration Failed', err }))
}

controllers.removeUser = (req, res) => {
    res.json('remove user')
}

controllers.setUserStatus = (req, res) => {

    // getting user status detail
    const { userId, status } = req.params

    // changing user active status
    User.findByIdAndUpdate(userId, { $set: { active: status } }, { new: true })
        .populate()
        .exec()
        .then(response => {

            if (response)
                res.json({ status: true, message: 'User status changed successfully' })
            else
                res.json({ status: false, message: 'Fail to change user status' })
        })
        .catch(err => res.json({ status: false, err }))
}


/**---------------------------------------------------Professor controllers----------------------------------------------------*/
controllers.addTopic = (req, res) => {

    // subject info
    let subject = req.params

    // saving subject to curriculum
    let newTopic = new Curriculum(subject)
    newTopic.save()
        .then(response => {

            if (response)
                res.json({ status: true, message: `Added to ${response.branch} Curriculum` })
            else
                res.json({ status: false, message: 'Fail to add topic' })
        })
        .catch(err => res.json({ status: false, err }))
}

controllers.removeTopic = (req, res) => {

    // user data from request token
    const data = reqTokenDecoder(req)

    // data from request params
    const subject = req.params.subject
    const sem = req.params.sem

    Curriculum.findOneAndDelete({ subject: subject, sem: sem, branch: data.branch }, (err, response) => {

        if (err)
            res.json({ status: false, message: 'Subject not deleted', err })
        else
            res.json({ status: false, message: 'Subject deleted form curriculum' })
    })
}

controllers.createMarksheet = (req, res) => {
    res.json('Create marksheet')
}

controllers.addEvent = (req, res) => {
    res.json('Add Event')
}

controllers.generateAttendance = (req, res) => {
    res.json('Generate attendance')
}


/**---------------------------------------------------Librarian controllers----------------------------------------------------*/
controllers.addBook = (req, res) => {

    // getting book details
    let book = req.body

    // adding book to library
    let newBook = new Library(book)
    newBook.save()
        .then(response => {
            if (response)
                res.json({ status: true, message: 'Book added successfully' })
            else
                res.json({ status: false, message: 'Failed to add Book' })
        })
        .catch(err => res.json({ status: false, message: 'Failed to add Book', err }))
}

controllers.removeBook = (req, res) => {

    // getting book _id
    const book_id = req.params.book_id

    // finding book
    Library.findByIdAndDelete(book_id)
        .then(response => {
            if (response)
                res.json({ status: true, message: 'Book removed sucessfully' })
            else
                res.json({ status: false, message: 'Removing book unsuccessfull' })
        })
        .catch(err => res.json({ status: false, err }))

}

controllers.issueBook = (req, res) => {

    // getting route user details from headers token
    const librarian = reqTokenDecoder(req)

    // getting book & user ids
    const book = req.params.book_id
    const user = req.params.user_id

    // finding book
    Library.findByIdAndUpdate(book, { $set: { issuedTo: user, issuedBy: librarian.id, issued: true } }, { new: true })
        .then(response => {
            if (response)
                res.json({ status: true, message: 'Book issued', issue_details: response })
            else
                res.json({ status: false, message: 'Book not issued' })
        })
        .catch(err => res.json({ status: false, err }))
}

controllers.returnBook = (req, res) => {

    // getting book id
    const book = req.params.book_id

    // returning book
    Library.findByIdAndUpdate(book, { $set: { issuedTo: null, issuedBy: null, issued: false } }, { new: true })
        .then(response => {
            if (response)
                res.json({ status: true, message: 'Book returned', issue_details: response })
            else
                res.json({ status: false, message: 'Book not returned' })
        })
        .catch(err => res.json({ status: false, err }))

}


/**---------------------------------------------------Student controllers----------------------------------------------------*/
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
controllers.userConfirm = (req, res) => {

    // collecting confirmation token
    const token = req.params.token



}

controllers.editProfile = (req, res) => {

    // getting user data from request headers
    const data = reqTokenDecoder(req)

    // getting what to edit
    const edit = req.params.edit

    // getting edit value acco
    const options = ['email', 'username', 'contact', 'profile_picture']
    const value = options.find(element => {

        // when user choose to edit available field to edit
        if (edit == element) return element

        // when user choose to edit invalid field to edit
        else res.json({ status: false, message: `edit option not avialable for ${edit}` })
    })

    // edit filters
    let filter = {}



}

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

                    // hashing new password before updating
                    const hashedPassword = bcrypt.hashSync(newPassword, 10);

                    // updating password
                    User.update({ _id: doc.id }, { $set: { password: hashedPassword } }, { new: true })
                        .then(response => {

                            if (response)
                                res.json({ status: true, message: 'Password updated successfully' })
                            else
                                res.json({ status: false, message: 'Failed to update password' })
                        })
                        .catch(err => res.json({ status: false, message: 'Failed to update password', err }))
                })
                .catch(err => res.json({ status: false, message: 'Entered wrong password', err }))
        })
        .catch(err => res.json({ status: false, message: 'User not found', err }))
}

controllers.forgotPassword = (req, res) => {

    // getting email address entered by user
    const userEmail = req.body.email

    // getting request token from headers
    const data = reqTokenDecoder(req)

    console.log(data.id) //testing

    // finding user
    User.findById(data.id)
        .then(user => {

            // comparing user email
            if (user.email === userEmail) {

                // user payload
                const userInfo = {
                    id: user._id,
                    username: user.username,
                    email: user.email,
                    role: user.role,
                    branch: user.branch
                }

                // generating password reset token & storing it in DB for further validation
                const token = jwt.sign(userInfo, process.env.JWT_KEY, { expiresIn: '10m' })

                // password reset link info
                let info = { userId: user.id, token: token }

                // storing reset token for further validation
                let newToken = new PasswordReset(info)
                newToken.save()
                    .then(response => {

                        // password reset link
                        const passwordResetLink = `localhost:${process.env.PORT}/api/resetPassword/:${token}/:${response._id}`
                        // mail this link to registered email using nodemailer


                        //----DELETE this code after setting nodemailer----*/
                        res.json({ status: true, message: 'Reset token generated', token_id: response._id, token: token, })
                        //---------------------------------------------------
                    })
                    .catch(err => res.json({ status: false, message: 'unable to save link' }, err))
            }
            else
                res.json({ status: false, message: 'Can not generate reset link. Enter registered email address' })
        })
    //.catch(err => res.json({ status: false, message: 'User Not Found', error: err }))
}

controllers.setForgotPassword = (req, res) => {

    // getting user input
    const newPassword = req.body.newPassword
    const resetToken = req.params.token
    const token_id = req.params.id

    // getting request headers
    const data = reqTokenDecoder(req)

    // finding resetToken in DB
    PasswordReset.findById(token_id)
        .then(info => {

            // comparing the user reset link token and saved reset token
            if (resetToken == info.token) {

                // verfiying reset token validity
                console.log('jwt key', process.env.JWT_KEY)
                jwt.verify(resetToken, process.env.JWT_KEY, (err, decoded) => {

                    // checking for verfication errors
                    if (err) res.json({ status: false, message: 'reset link malfunctioned or tempered', err })

                    // hashing new password before updating
                    const hashedPassword = bcrypt.hashSync(newPassword, 10);

                    // finding user by id and updating password
                    User.update({ _id: data.id }, { $set: { password: hashedPassword } }, { new: true })
                        .then(response => {

                            if (response)
                                res.json({ status: true, message: 'Password updated successfully' })
                            else
                                res.json({ status: false, message: 'Failed to update password' })
                        })
                        .catch(err => res.json({ status: false, message: 'Failed to update password', err }))
                })
            }
            else res.json({ status: false, message: 'Link is not same as sent' })

        })
        .catch(err => res.json({ status: false, message: 'reset link not found', err }))
}


// exporting module
module.exports = controllers