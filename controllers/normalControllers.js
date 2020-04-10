// Database Modules
require('../models/DB')
const { User, Admin, Professor, Librarian, Student, PasswordReset } = require('../models/User')
const Library = require('../models/Archive')
const { Curriculum, Marksheet, Timetable } = require('../models/Academic')

/** */
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const reqTokenDecoder = require('../utils/reqTokenDecoder')
require('dotenv').config()

let controllers = {}

/**---------------------------------------------------Admin controllers----------------------------------------------------*/
<<<<<<< HEAD
controllers.forwardMarksheet = (req, res) => {

    const std_id = req.params.std_id

    Student.findById(std_id)
    .populate('Student', 'marksheets')
    .exec()
    .then( student => {
        if (student) {
            // need to setup the email to forward the marksheet
        }
    })
    .catch()
=======
controllers.viewUsers = (req, res) => {

    // getting search value from params
    const user = req.params.user.toUpperCase()

    // filter object
    let filter = {}

    if (user === 'ALL') {}

    else if (user === 'ADMIN')
        filter.role = 'ADMIN'
    
    else if (user === 'PROFESSOR')
    filter.role = 'PROFESSOR'

    else if (user === 'LIBRARIAN')
    filter.role = 'LIBRARIAN'

    else if (user === 'STUDENT')
    filter.role = 'STUDENT'

    // Searching using filter   
    User.find(filter)
        .populate()
        .exec()
        .then(response => {
            if (response)
                res.json({ status: true, message: `Found user(s)`, user: response })
            else
                res.json({ status: false, message: message, user: response })
        })
        .catch(err => res.json({ status: false, err }))
>>>>>>> viewdesk
}

/**---------------------------------------------------Professor controllers----------------------------------------------------*/
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
    User.find({ branch: user.branch, role: user.role })
        .populate()
        .exec()
        .then(response => {
            if (response)
                res.json({ status: true, message: `All Students of ${user.branch} found`, students: result })
            else
                res.json({ status: false, message: 'Students not found' })

        })
        .catch(err => res.json({ status: false, err }))
}

controllers.professorForum = (req, res) => {
    res.json('Professor Forum')
}

/**---------------------------------------------------Librarian controllers----------------------------------------------------*/
controllers.searchBooks = (req, res) => {

    Library.find({})
        .populate()
        .exec()
        .then(response => {
            if (response)
                res.json({ status: true, message: 'available books', books: response })
            else
                res.json({ status: false, message: 'Books are not available' })
        })
        .catch(err => res.json({ status: false, err }))
}

controllers.searchBooks = (req, res) => {


    let search = {}
    if (req.params !== undefined) {


    }

}

controllers.archiveRecord = (req, res) => {

    // filter for searching in DB
    let filter = {}
    let message = ``

    // getting params
    const view = req.params.view

    /** setting filter according to params value */
    if (view.toLowerCase().trim() === 'issued') {
        filter.issued = true
        message = `Issued Books`
    }

    else if (view.toLowerCase().trim() === 'available') {
        filter.issued = false
        message = `Available Books`
    }

    else
        res.status().json({ status: false, message: `Invalid request` })


    // searching with filters
    Library.find(filter)
        .populate()
        .exec()
        .then(response => {

            if (response && response.length > 0)
                res.json({ status: true, message: message, books: response })

            else {
                message = `No books found`
                res.json({ status: false, message: message, books: response })
            }
        })
        .catch(err => res.json({ status: false, err }))
}

/**---------------------------------------------------Student controllers----------------------------------------------------*/
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
controllers.Profile = (req, res) => {

    // getting token from headers
    const data = reqTokenDecoder(req)

    // finding user in DB
    User.findById(data.id)
        .populate()
        .exec()
        .then(response => {
            if (response) {

                // exculding password before storing user info in profile
                const { password, ...profile } = response._doc
                res.status(200).json({ status: true, message: `Profile found`, profile: profile })
            }
            else
                res.json({ status: true, message: 'Profile not found' })
        })
        .catch(err => res.json({ status: false, message: 'Profile not found', error: err }))
}

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
