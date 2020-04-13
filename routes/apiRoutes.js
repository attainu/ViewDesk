const Router = require('express').Router()
const Authenticate = require('../middlewares/authenticate')

const { register, 
        addUser, removeUser, setUserStatus, /** Admin functions*/
        addEvent, createMarksheet, generateAttendance, addTopic, removeTopic, /** professor functions */
        addBook, removeBook, issueBook, returnBook,/** Librarian functions*/
        markAttendance, /** Student functions */ 
        login, userConfirm, resetPassword, forgotPassword, setForgotPassword, editProfile, /** common functions */ } = require('../controllers/apiControllers')
/**
 *      ADMIN FEATURE:
 * 1) Activate & Deactivate user
 * 2) Enqueue & Dequeue users from Classroom
 * 
 *      SETUP NODEMAILER
 * 1) Registertion & Confirmation of user
 * 2) RESET & FORGOT password
 */

/** Admin Register*/
Router.post('/api/register', register)

/** common routes*/
Router.post('/api/login', login)
Router.post('/api/confirm/:token', userConfirm)

/** Admin routes */
Router.post('/api/admin/adduser/:branch/:role', Authenticate, addUser)
Router.patch('/api/admin/:userId/:status', Authenticate, setUserStatus)
Router.patch('/api/admin/resetpassword', Authenticate, resetPassword)
Router.post('/api/admin/forgotpassword', Authenticate, forgotPassword)
Router.patch('/api/admin/forgotpassword/:token/:id', Authenticate, setForgotPassword)
Router.delete('/api/admin/removeuser/:id', Authenticate, removeUser) // <= need to fix it

/** professor routes */
Router.post('/api/professor/curriculum/add', Authenticate, addTopic)
Router.post('/api/professor/addmarksheet', Authenticate, createMarksheet)
Router.delete('/api/professor/curriculum/remove', Authenticate, removeTopic)
Router.patch('/api/professor/resetpassword', Authenticate, resetPassword)
Router.post('/api/professor/forgotpassword', Authenticate, forgotPassword)
Router.patch('/api/professor/forgotpassword/:token/:id', Authenticate, setForgotPassword)


/** librarina routes */
Router.post('/api/librarian/addbook', Authenticate, addBook)
Router.patch('/api/librarian/issue/:book_id/:user_id', Authenticate, issueBook)
Router.patch('/api/librarian/return/:book_id', Authenticate, returnBook)
Router.delete('/api/librarian/remove/:book_id', Authenticate, removeBook)
Router.patch('/api/librarian/resetpassword', Authenticate, resetPassword)
Router.post('/api/librarian/forgotpassword', Authenticate, forgotPassword)
Router.patch('/api/librarian/forgotpassword/:token/:id', Authenticate, setForgotPassword)

/** Student routes */
Router.patch('/api/student/resetpassword', Authenticate, resetPassword)
Router.post('/api/student/forgotpassword', Authenticate, forgotPassword)
Router.patch('/api/student/forgotpassword/:token/:id', Authenticate, setForgotPassword)
//Router.post('/api/student/markattendance', Authenticate, markAttendance)

// exporting module
module.exports = Router
