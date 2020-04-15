let Router = require('express').Router()
const  Authenticate = require('../middlewares/authenticate')

const { viewUsers, /** Admin controllers */
        professorForum, students, forwardMarksheet,/** Professor controllers */
        /** Librarian controllers */
        searchBooks,timetable, studentMarksheet, progress, issuedBooks, studentForum, /**  Student controllers */
        Profile, marksheet, curriculum, archiveRecord, calendar /** Common controllers */ } = require('../controllers/normalControllers')

/**home */
Router.get('/', Home)

/** Admin routes */
Router.get('/api/admin/profile', Authenticate, Profile)
Router.get('/api/admin/view/:role', Authenticate, viewUsers)
Router.get('/api/admin/marksheet/:view', Authenticate, marksheet)
Router.get('/api/admin/marksheet/forward/:std_id', Authenticate, forwardMarksheet)

/** professor routes */
Router.get('/api/professor/profile', Authenticate, Profile)
Router.get('/api/professor/students', Authenticate, students)
Router.get('/api/professor/curriculum/:branch', Authenticate, curriculum)

/** Librarian routes */
Router.get('/api/librarian/profile', Authenticate, Profile)
Router.get('/api/librarian/books/:category/book', Authenticate, searchBooks)
Router.get('/api/librarian/records/:view', Authenticate, archiveRecord)
Router.get('/api/librarian/users/:role', Authenticate, viewUsers)

/** Students routes */
Router.get('/api/student/profile', Authenticate, Profile)
Router.get('/api/student/curriculum', Authenticate, curriculum) // <= fix its controller
Router.get('/api/student/timetable', Authenticate, timetable)
Router.get('/api/student/issuedBooks', Authenticate, issuedBooks)
Router.get('/api/student/marksheet', Authenticate, studentMarksheet)


module.exports = Router