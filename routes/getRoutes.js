let Router = require('express').Router()
const  Authenticate = require('../middlewares/authenticate')

const { AdminProfile, classroom, marksheet, /** Admin functions */
        professorProfile, professorForum, /** Professor functions */
        librarianProfile, issueBook, issueRecord, libForum, /** Librarian functions */
        studentProfile, curriculum, timetable, progress, issuedBooks, studentForum, /**  Student functions */
        calendar /** Common functions */} = require('../controllers/getControllers')

/** Admin routes */
Router.get('/admin/profile', Authenticate, AdminProfile)
Router.get('/admin/classroom', Authenticate, classroom) // optional
Router.get('/admin/marksheet', Authenticate, marksheet)
Router.get('/admin/calendar', Authenticate, calendar)


/** professor routes */
Router.get('/professor/profile', Authenticate, professorProfile)
Router.get('/professor/calendar', Authenticate, calendar)
Router.get('/professor/forum', Authenticate, professorForum)


/** Librarian routes */
Router.get('/librarian/profile', Authenticate, librarianProfile)
Router.get('/librarian/archieve', Authenticate, issueBook)
Router.get('/librarian/records', Authenticate, issueRecord)
Router.get('/librarian/calendar', Authenticate, calendar)
Router.get('/librarian/forum', Authenticate, libForum)

/** Students routes */
Router.get('/student/profile', Authenticate, studentProfile)
Router.get('/student/curriculum', Authenticate, curriculum)
Router.get('/student/timetable', Authenticate, timetable)
Router.get('/student/progress', Authenticate, progress)
Router.get('/student/issuedBooks', Authenticate, issuedBooks)
Router.get('/student/calendar', Authenticate, calendar)
Router.get('/student/forum', Authenticate, studentForum)

module.exports = Router