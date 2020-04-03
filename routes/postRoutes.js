const Router = require('express').Router()
const Authenticate = require('../middlewares/authenticate')

const { register, login, resetPassword, forgotPassword, setForgotPassword,/** common functions */
        addUser, removeUser, /** Admin functions*/
        addEvent, createMarksheet, generateAttendance, addTopic, removeTopic, /** professor functions */
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

/** Admin routes */
Router.post('/api/admin/addUser', Authenticate, addUser)
Router.post('/api/admin/resetpassword', Authenticate, resetPassword)
Router.post('/api/admin/forgotpassword', Authenticate, forgotPassword)
Router.post('/api/admin/forgotpassword/:token', Authenticate, setForgotPassword)
Router.delete('/api/admin/removeUser', Authenticate, removeUser)

//Router.post('/admin/report', Authenticate, forwardReport)

/** professor routes */
Router.post('/api/professor/curriculum/add', Authenticate, addTopic)
Router.delete('/api/professor/curriculum/remove', Authenticate, removeTopic)
Router.post('/api/professor/addmarksheet', Authenticate, createMarksheet)
Router.post('/api/professor/attendance:branch', Authenticate, generateAttendance)
Router.post('/api/professor/events', Authenticate, addEvent)

/** librarina routes */
Router.post('/api/librarian/archieve', Authenticate, addBook)

/** Student routes */
Router.post('/api/student/markattendance', Authenticate, markAttendance)


// exporting module
module.exports = Router
