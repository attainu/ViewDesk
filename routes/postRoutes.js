const Router = require('express').Router()
const { admAuth, proAuth, libAuth, stdAuth } = require('../middlewares/authenticate')

const { register, login, /**  */
        addClassroom, addUser, /** Admin functions*/
        addEvent, createMarksheet, generateAttendance, /** professor functions */
        addBook, /** Librarian functions*/
        markAttendance /** Student functions  */ } = require('../controllers/postControllers')

/** Register & Login routes */
Router.post('/register', register)
Router.post('/login', login)

/** Admin routes */
Router.post('/admin/addclassroom', admAuth, addClassroom)
Router.post('/admin/add:user', admAuth, addUser)

/** professor routes */
Router.post('/professor/calendarevents', proAuth, addEvent)
Router.post('/professor/marksheet', proAuth, createMarksheet)
Router.post('/professor/attendance', proAuth, generateAttendance)

/** librarina routes */
Router.post('/librarian/addbook', libAuth, addBook)

/** Student routes */
Router.post('/student/markattendance', stdAuth, markAttendance)

// exporting module
module.exports = Router
