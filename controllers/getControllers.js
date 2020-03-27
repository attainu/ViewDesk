// Database Modules
require('../models/DB')
const User = require('../models/User')

const jwt = require('jsonwebtoken')
require('dotenv').config()

let controllers = {}

/**---------Admin controllers------------------------*/
controllers.AdminProfile = (req, res) => {
    
}

controllers.classrooms = (req, res) => {
    res.json('All Classrooms')
}

controllers.allMarksheet = (req, res) => {
    res.json('All Marksheet')
}


/**---------Professor controllers--------------------*/
controllers.professorProfile = (req, res) => {
    res.json('Professor Profile')
}

controllers.calendar = (req, res) => {
    res.json('Calendar')
}

controllers.professorForum = (req, res) => {
    res.json('Professor Forum')
}


/**---------Librarina controller------------ */
controllers.librarianDashboard = (req, res) => {
    res.json('Librarian Dashboard')
}

controllers.librarianProfile = (req, res) => {
    res.json('Librarian Profile')
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

/**---------Student controllers---------------*/
controllers.studentProfile = (req, res) => {
    res.json('Student Profile')
}

controllers.curriculum = (req, res) => {
    res.json('curriculum')
}

controllers.timetable = (req, res) => {
    res.json('time table')
}

controllers.progress = (req, res) => {
    res.json('progress')
}

controllers.issuedBooks = (req, res) => {
    res.json('issued books')
}

controllers.studentForum = (req, res) => {
    res.json('Student Forum')
}

/**---------Common controllers--------------*/
controllers.calendar = (req, res) => {
    res.json('calender')
}

//exporting module
module.exports = controllers
