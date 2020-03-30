let Router = require('express').Router()
const  Authenticate = require('../middlewares/authenticate')

const { AdminProfile, classroom, marksheet, /** Admin functions */
        professorProfile, professorForum, /** Professor functions */
        librarianProfile, issueBook, issueRecord, libForum, /** Librarian functions */
        studentProfile, curriculum, timetable, progress, issuedBooks, studentForum, /**  Student functions */
        calendar /** Common functions */} = require('../controllers/getControllers')

/** Admin routes */
Router.get('/api/admin/profile', Authenticate, AdminProfile)
Router.get('/api/admin/classroom', Authenticate, classroom) // optional
Router.get('/api/admin/marksheet', Authenticate, marksheet)
Router.get('/api/admin/calendar', Authenticate, calendar)


/** professor routes */
Router.get('/api/professor/profile', Authenticate, professorProfile)
Router.get('/api/professor/calendar', Authenticate, calendar)
Router.get('/api/professor/forum', Authenticate, professorForum)


/** Librarian routes */
Router.get('/api/librarian/profile', Authenticate, librarianProfile)
Router.get('/api/librarian/archieve', Authenticate, issueBook)
Router.get('/api/librarian/records', Authenticate, issueRecord)
Router.get('/api/librarian/calendar', Authenticate, calendar)
Router.get('/api/librarian/forum', Authenticate, libForum)

/** Students routes */
Router.get('/api/student/profile', Authenticate, studentProfile)
Router.get('/api/student/curriculum', Authenticate, curriculum)
Router.get('/api/student/timetable', Authenticate, timetable)
Router.get('/api/student/progress', Authenticate, progress)
Router.get('/api/student/issuedBooks', Authenticate, issuedBooks)
Router.get('/api/student/calendar', Authenticate, calendar)
Router.get('/api/student/forum', Authenticate, studentForum)

module.exports = Router