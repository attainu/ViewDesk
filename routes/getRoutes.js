const Router = require('express').Router()
const { admAuth, proAuth, libAuth, stdAuth /** middlewares */} = require('../middlewares/authenticate')

const { AdminProfile, classroom, marksheet, /** Admin functions */
        professorProfile, professorForum, /** Professor functions */
        librarianProfile, issueBook, issueRecord, libForum, /** Librarian functions */
        studentProfile, curriculum, timetable, progress, issuedBooks, studentForum, /**  Student functions */
        calendar /** Common functions */} = require('../controllers/getControllers')

/** Admin routes */
Router.get('/admin/profile', admAuth, AdminProfile)
Router.get('/admin/classroom', admAuth, classroom) // optional
Router.get('/admin/marksheet', admAuth, marksheet) 
Router.get('/admin/calendar', admAuth, calendar)


/** professor routes */
Router.get('/professor/profile', proAuth, professorProfile)
Router.get('/professor/calendar', proAuth, calendar)
Router.get('/professor/forum', proAuth, professorForum)


/** Librarian routes */
Router.get('/librarian/profile', libAuth, librarianProfile)
Router.get('/librarian/archieve', libAuth, issueBook)
Router.get('/librarian/records', libAuth, issueRecord)
Router.get('/librarian/calendar', libAuth, calendar)
Router.get('/librarian/forum', libAuth, libForum)

/** Students routes */
Router.get('/student/profile', stdAuth, studentProfile)
Router.get('/student/curriculum', stdAuth, curriculum)
Router.get('/student/timetable', stdAuth, timetable)
Router.get('/student/progress', stdAuth, progress)
Router.get('/student/issuedBooks', stdAuth, issuedBooks)
Router.get('/student/calendar', stdAuth, calendar)
Router.get('/student/forum', stdAuth, studentForum)

module.exports = Router