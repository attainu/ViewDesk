/** database modules */
require('../models/DB')
const { User, Admin, Professor, Librarian, Student, PasswordReset } = require('../models/User')
const Library = require('../models/Archive')
const { AttendanceLink } = require('../models/Link')
const { Curriculum, Result } = require('../models/Academic')

/** packages & modules */
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const reqTokenDecoder = require('../utils/reqTokenDecoder')
const mailer = require('../utils/mailer')

require('dotenv').config('../.env')

let controllers = {}

/**---------------------------------------------------Register & Login controllers----------------------------------------------------*/
controllers.register = (req, res) => {

    // getting user details from requrest params
    const user = req.body

    // user object
    let userObj = {
        name: user.name,
        email: user.email,
        password: user.password,
        contact: user.contact,
        gender: user.gender,
        role: user.role.toUpperCase(),
        branch: user.branch.toUpperCase()
    }

    // adding user to DB
    let newUser = new User(userObj)
    newUser.save()
        .then(credentials => {

            /** IMPORTANT NOTE
             * send LOGIN credentials on registered EMAIL address
             * after user sucessfull registration
             */

            if (credentials)
                res.json({ status: true, message: 'Registration Successfull' })
            else
                res.json({ status: false, message: 'Registration Failed' })
        })
        .catch(err => res.json({ status: false, message: 'Registration Failed', Error: `${err}` }))
}

controllers.login = (req, res) => {

    // getting login details from request body
    const { email, password } = req.body

    // finding user in DB
    User.findOne({ email: email })
        .then(user => {
            // comparing password
            bcrypt.compare(password, user.password)
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
                        const token = jwt.sign(payload, process.env.JWT_KEY, { expiresIn: '24h' })

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

    // getting user type from params
    const params = req.params

    // getting user details from request body
    const user = req.body

    // user credentials & details
    let userObj = {
        name: user.name,
        email: user.email,
        password: user.password,
        contact: user.contact,
        role: params.role.toUpperCase(),
        branch: params.branch.toUpperCase()
    }

    // saving user in DB
    let newUser = new User(userObj)
    newUser.save()
        .then(response => {

            /** IMPORTANT NOTE
             * send LOGIN credentials on registered EMAIL address
             * after user sucessfull registration
             */
            if (response)
                res.json({ status: true, message: 'Registration successfull & Credentials sent to registered Email addresss' })
            else

                res.json({ status: false, message: 'Registration failed' })
        })
        .catch(err => res.json({ status: false, err }))
}

controllers.removeUser = (req, res) => {
    res.json('remove user')
    /**
        // getting user type from params
        const params = req.params
    
        // getting user details from request params
        const user = req.params
    
        // find & deleting user
        User.findByIdAndDelete(user._id, (err, response) => {
    
            if (err) return res.json({ status: false, err })
            if (response) return res.json({ status: true, message: 'User Removed Successfully' })
        })
    */
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

    /**let marksheet = req.params

    let newMarsheet = new Result(marksheet)
    newMarsheet.save()
        .then(response => {
            if (response)
                res.json({ status: true, message: 'Marksheet added successfully' })
            else
                res.json({ status: false, message: 'Fail to add Marsheet' })
        })
        .catch(err => res.json({ status: false, err }))*/


    const { stdId: _id, grade, marks } = req.params

    User.findOne({ _id }, async (error, user) => {

        console.log(user)
        //user.author = author;
        //console.log(story.author.name); // prints "Ian Fleming"
    });
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

    const userEmail = req.params.email

    // getting request token
    const data = reqTokenDecoder(req)

    User.findById(data.id)
        .then(doc => {

            // comparing user email
            if (doc.email == userEmail) {

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
                    userId: doc.id,
                    token: token
                }

                let newToken = new PasswordReset(info)
                newToken.save()

                // password reset link
                const resetLink = `/api/${doc.role}/resetPassword/:${token}`
                // mail this link to registered email using nodemailer


                /**----DELETE this code after setting nodemailer----*/
                res.json({ status: true, message: 'Reset token generated', token: token })
                //---------------------------------------------------
            }
            else
                res.json({ status: false, message: 'Can not generate reset link. Enter registered email address' })
        })
    //.catch(err => res.json({ status: false, message: 'User Not Found', error: err }))
}

controllers.setForgotPassword = (req, res) => {

    // getting new password
    newPassword = req.params.password

    // getting request headers
    const data = reqTokenDecoder(req)

    const token = req.params.token

    // finding token in DB
    PasswordReset.findOne({ userId: data.id })
        .then(doc => {
            console.log(doc.token)
            console.log(token)
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
        .catch(err => res.json({ status: false, message: 'reset link not found', error: err }))
}


// exporting module
module.exports = controllers