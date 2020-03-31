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
Router.post('/api/register', register)
Router.post('/api/login', login)
Router.post('/api/resetpassword/:link', forgotPassword)

/** Admin routes */
Router.post('/api/admin/addUser', Authenticate, addUser)
Router.delete('/api/admin/removeUser', Authenticate, removeUser)

//Router.post('/admin/report', Authenticate, forwardReport)

/** professor routes */
Router.post('/api/professor/curriculum', Authenticate, curriculum)
Router.post('/api/professor/marksheet', Authenticate, createMarksheet)
Router.post('/api/professor/attendance', Authenticate, generateAttendance)
Router.post('/api/professor/events', Authenticate, addEvent)
Router.post('/api/professor/resetpassword', Authenticate, resetPassword)


/** librarina routes */
Router.post('/api/librarian/archieve', Authenticate, addBook)

/** Student routes */
Router.post('/api/student/markattendance', Authenticate, markAttendance)


// exporting module
module.exports = Router
