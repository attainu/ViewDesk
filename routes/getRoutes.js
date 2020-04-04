let Router = require('express').Router()
const  Authenticate = require('../middlewares/authenticate')

const { AdminProfile, /** Admin controllers */
        professorProfile, professorForum, /** Professor controllers */
        librarianProfile, issueBook, issueRecord, libForum, /** Librarian controllers */
        studentProfile, timetable, progress, issuedBooks, studentForum, /**  Student controllers */
        students, professors, calendar, marksheet, curriculum, /** Common controllers */ } = require('../controllers/getControllers')


/** Admin routes */
Router.get('/api/admin/profile', Authenticate, AdminProfile)
Router.get('/api/admin/students', Authenticate, students)
Router.get('/api/admin/professors', Authenticate, professors)
Router.get('/api/admin/marksheet', Authenticate, marksheet)
Router.get('/api/admin/calendar', Authenticate, calendar)

/** professor routes */
Router.get('/api/professor/profile', Authenticate, professorProfile)
//Router.get('/api/professor/students', Authenticate, students) <= FIX this route in Professor branch
Router.get('/api/professor/curriculum/:branch', Authenticate, curriculum)
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
Router.get('/api/student/curriculum:branch', Authenticate, curriculum)
Router.get('/api/student/timetable', Authenticate, timetable)
Router.get('/api/student/progress', Authenticate, progress)
Router.get('/api/student/issuedBooks', Authenticate, issuedBooks)
Router.get('/api/student/calendar', Authenticate, calendar)
Router.get('/api/student/forum', Authenticate, studentForum)

module.exports = Router