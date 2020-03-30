const Router = require('express').Router()
const Authenticate = require('../middlewares/authenticate')

const { register, login, resetPassword, forgotPassword,/** common functions */
        addUser, removeUser, /** Admin functions*/
        addEvent, createMarksheet, generateAttendance, curriculum, /** professor functions */
        addBook, /** Librarian functions*/
        markAttendance /** Student functions */ } = require('../controllers/postControllers')

/**
 * NOTE:-
 * add RESET & FORGOT password route to all users
 * add REMOVE USER route to Admin
 * add EDIT marksheet route to Professor
 * add REMOVE BOOK route to Librarian
 */

/** Register & Login routes */
Router.post('/register', register)
Router.post('/login', login)

/** Admin routes */
Router.post('/admin/addUser', Authenticate, addUser)
Router.post('/admin/removeUser', Authenticate, removeUser)
//Router.post('/admin/report', Authenticate, forwardReport)

/** professor routes */
Router.post('/professor/curriculum', Authenticate, curriculum)
Router.post('/professor/marksheet', Authenticate, createMarksheet)
Router.post('/professor/attendance', Authenticate, generateAttendance)
Router.post('/professor/events', Authenticate, addEvent)

/** librarina routes */
Router.post('/librarian/archieve', Authenticate, addBook)

/** Student routes */
Router.post('/student/markattendance', Authenticate, markAttendance)
Router.post('/student/password', Authenticate, resetPassword)

// exporting module
module.exports = Router
