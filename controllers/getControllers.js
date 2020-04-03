// Database Modules
require('../models/DB')
const { User, Admin, Professor, Librarian, Student, PasswordReset } = require('../models/User')
const Library = require('../models/Archive')
const { Curriculum, Marksheet, Timetable } = require('../models/Academic')

/** */
const jwt = require('jsonwebtoken')
const axios = require('axios')
const reqTokenDecoder = require('../utils/reqTokenDecoder') // utility function
require('dotenv').config()

let controllers = {}

/**---------------------------------------------------Admin controllers----------------------------------------------------*/
controllers.AdminProfile = (req, res) => {

    // getting token from headers
    const data = reqTokenDecoder(req)

    // finding user in DB
    User.findOne({ email: data.email, role: data.role })
        .then(user => {
            if (user)
                //sending JSON response
                res.json({
                    status: true,
                    message: `Profile found`,
                    profile: {
                        name: user.name,
                        email: user.email,
                        role: user.role,
                        branch: 'Add branch here...'
                        /** add more profile details here */
                    }
                })
            else
                res.json({ status: true, message: 'Profile not found' })
        })
        .catch(err => res.json({ status: false, message: 'Profile not found', error: err }))
}

/**---------------------------------------------------Professor controllers----------------------------------------------------*/
controllers.professorProfile = (req, res) => {

    // getting token from headers
    const data = reqTokenDecoder(req)

    // finding user in DB
    User.findOne({ email: data.email, role: data.role })
        .then(user => {
            if (user)
                //sending JSON response
                res.json({
                    status: true,
                    message: `Profile found`,
                    profile: {
                        name: user.name,
                        email: user.email,
                        role: user.role,
                        branch: 'Add branch here...'// user.branch
                        /** add more profile details here */
                    }
                })
            else
                res.json({ status: true, message: 'Profile not found' })
        })
        .catch(err => res.json({ status: false, message: 'Profile not found', error: err }))
}

controllers.curriculum = (req, res) => {

    let branch = req.params.branch

    Curriculum.find({ branch: branch })
        .then(response => {
            if (response)
                res.json({ status: true, message: `${branch} curriculum found` })
            else
                res.json({ status: false, message: `${branch} curriculum not found` })
        })
        .catch(error => res.json({ status: false, error }))
}

controllers.students = (req, res) => {

    // getting user info from the request token
    let user = reqTokenDecoder(req)

    // find students
    User.find({ branch: user.branch }, (error, result) => {
        if (err)
            res.json({ status: false, error })
        if (result)
            res.json({ status: true, message: `All Students of ${user.branch} found`, students: result })
    })

}

controllers.professorForum = (req, res) => {
    res.json('Professor Forum')
}

/**---------------------------------------------------Librarian controllers----------------------------------------------------*/
controllers.librarianProfile = (req, res) => {

    // getting token from headers
    const data = reqTokenDecoder(req)

    // finding user in DB
    User.findOne({ email: data.email, role: data.role })
        .then(user => {
            if (user)
                //sending JSON response
                res.json({
                    status: true,
                    message: `Profile found`,
                    profile: {
                        name: user.name,
                        email: user.email,
                        role: user.role,
                        branch: 'Add branch here...'
                        /** add more profile details here */
                    }
                })
            else
                res.json({ status: true, message: 'Profile not found' })
        })
        .catch(err => res.json({ status: false, message: 'Profile not found', error: err }))
}

controllers.issueBook = (req, res) => {
    res.json('Issue Book')
}

controllers.issueRecord = (req, res) => {
    res.json('Issue Record')
}

controllers.libForum = (req, res) => {
    res.json('librarian forum')
}

/**---------------------------------------------------Student controllers----------------------------------------------------*/
controllers.studentProfile = (req, res) => {

    // getting token from headers
    const data = reqTokenDecoder(req)

    // finding user in DB
    User.findOne({ email: data.email, role: data.role })
        .then(user => {
            if (user)
                //sending JSON response
                res.json({
                    status: true,
                    message: `Profile found`,
                    profile: {
                        name: user.name,
                        email: user.email,
                        role: user.role,
                        branch: 'Add branch here...'
                        /** add more profile details here */
                    }
                })
            else
                res.json({ status: true, message: 'Profile not found' })
        })
        .catch(err => res.json({ status: false, message: 'Profile not found', error: err }))
}

controllers.curriculum = (req, res) => {

    // getting token from headers
    const data = reqTokenDecoder(req)

    // finds branch curriculum in DB
    Curriculum.find({ branch: data.branch })
        .then(topics => {
            if (topics)
                res.json({ status: true, message: `Curriculum found`, Curriculum: topics })
            else
                res.json({ status: false, message: 'Curriculum Not Found' })
        })
        .catch(err => json({ status: false, message: 'Curriculum Not Found', error: err }))
}

controllers.timetable = (req, res) => {

    // getting token from headers
    const data = reqTokenDecoder(req)

    // finds branch timetable in DB
    Timetable.findOne({ branch: data.branch })
        .then(timetable => {
            if (timetable) res.json({ status: true, message: `time table found`, Timetable: timetable })
            else res.josn({ status: false, message: 'not found', })
        })
        .catch(err => res.josn({ status: false, message: 'Time table Not Found', error: err }))
}

controllers.progress = (req, res) => {
    res.json('progress')
}

controllers.issuedBooks = (req, res) => {

    /**
     * to view issued books search in Archieve
     * and look into the issuedTo field of each book
     */

    // getting token from headers
    const data = reqTokenDecoder(req)

    Library.find({ issuedTo: data.email, issued: true })
        .then(issued_books => {
            if (issued_books)
                res.json({ status: true, message: 'issued Book(s) found', books: issued_books })
            else
                res.json({ status: false, message: 'No issued Books found', books: issued_books })
        })
        .catch(err => res.json({ status: false, message: 'No issued Books found', Error: err }))
}

controllers.studentForum = (req, res) => {
    res.json('Student Forum')
}

/**---------------------------------------------------Common controllers----------------------------------------------------*/
controllers.marksheet = (req, res) => {


    let branch = req.params.branch
    let email = req.query.email
    let query = { branch: branch, email: email }
    Marksheet.find(query)
        .then(marksheet => {
            if (marksheet)
                res.json({ status: true, message: 'Marksheet found', marksheet: marksheet })
            else
                res.json({ status: true, message: 'Marksheet Not found', })
        })
        .catch(err => res.json({ status: true, message: 'Marsheet', marksheet: marksheet }))
}

controllers.calendar = (req, res) => {
    res.json('calender')
}


//exporting module
module.exports = controllers
