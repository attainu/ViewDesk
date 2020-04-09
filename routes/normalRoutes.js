let Router = require('express').Router()
const  Authenticate = require('../middlewares/authenticate')

const {  /** Admin controllers */
        professorForum, students,/** Professor controllers */
        /** Librarian controllers */
        searchBooks,timetable, progress, issuedBooks, studentForum, /**  Student controllers */
        Profile, viewUsers, marksheet, curriculum, archiveRecord, calendar /** Common controllers */ } = require('../controllers/normalControllers')


/** Admin routes */
Router.get('/api/admin/profile', Authenticate, Profile)
Router.get('/api/admin/users/:role', Authenticate, viewUsers)
Router.get('/api/admin/marksheet/:view', Authenticate, marksheet)
Router.get('/api/admin/marksheet/forward/:std_id', Authenticate, forwardMarksheet)
Router.get('/api/admin/calendar', Authenticate, calendar)

/** professor routes */
Router.get('/api/professor/profile', Authenticate, Profile)
Router.get('/api/professor/students', Authenticate, students)
Router.get('/api/professor/curriculum/:branch', Authenticate, curriculum)
Router.get('/api/professor/calendar', Authenticate, calendar)
Router.get('/api/professor/forum', Authenticate, professorForum)

/** Librarian routes */
Router.get('/api/librarian/profile', Authenticate, Profile)
Router.get('/api/librarian/books/:category/book', Authenticate, searchBooks)
Router.get('/api/librarian/records/:view', Authenticate, archiveRecord)
Router.get('/api/librarian/users/:role', Authenticate, viewUsers)
Router.get('/api/librarian/calendar', Authenticate, calendar)

/** Students routes */
Router.get('/api/student/profile', Authenticate, Profile)
Router.get('/api/student/curriculum:branch', Authenticate, curriculum)
Router.get('/api/student/timetable', Authenticate, timetable)
Router.get('/api/student/progress', Authenticate, progress)
Router.get('/api/student/issuedBooks', Authenticate, issuedBooks)
Router.get('/api/student/calendar', Authenticate, calendar)
Router.get('/api/student/forum', Authenticate, studentForum)

module.exports = Router