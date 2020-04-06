const Router = require('express').Router()
const Authenticate = require('../middlewares/authenticate')

const { register, login, resetPassword, forgotPassword, setForgotPassword,/** common functions */
        addUser, removeUser, /** Admin functions*/
        addEvent, createMarksheet, generateAttendance, addTopic, removeTopic, /** professor functions */
        addBook, removeBook, issueBook, returnBook,/** Librarian functions*/
        markAttendance /** Student functions */ } = require('../controllers/apiControllers')

/**
 * NOTE:-
 * add RESET & FORGOT password route
 * add REMOVE USER route to Admin
 * add EDIT marksheet route to Professor
 * add REMOVE BOOK route to Librarian
 */

/** Register & Login routes */
Router.post('/api/register', register)
Router.post('/api/login', login)

/** Admin routes */
Router.post('/api/admin/adduser/:branch/:role', Authenticate, addUser)
Router.delete('/api/admin/removeuser/:branch/:role', Authenticate, removeUser)
Router.post('/api/admin/resetpassword', Authenticate, resetPassword)
Router.post('/api/admin/forgotpassword', Authenticate, forgotPassword)
Router.post('/api/admin/setforgotpassword/:token', Authenticate, setForgotPassword)

//Router.post('/admin/report', Authenticate, forwardReport)

/** professor routes */
Router.post('/api/professor/curriculum/add', Authenticate, addTopic)
Router.delete('/api/professor/curriculum/remove', Authenticate, removeTopic)
Router.post('/api/professor/addmarksheet', Authenticate, createMarksheet)
Router.post('/api/professor/attendance:branch', Authenticate, generateAttendance)
Router.post('/api/professor/events', Authenticate, addEvent)

/** librarina routes */
Router.post('/api/librarian/addbook', Authenticate, addBook)
Router.delete('/api/librarian/remove/:book_id', Authenticate, removeBook)
Router.patch('/api/librarian/issue/:book_id/:user_id', Authenticate, issueBook)
Router.patch('/api/librarian/return/:book_id', Authenticate, returnBook)

/** Student routes */
Router.post('/api/student/markattendance', Authenticate, markAttendance)


// exporting module
module.exports = Router
