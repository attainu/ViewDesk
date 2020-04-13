/** required modules */
require('../models/DB')
const { User, Admin, Professor, Librarian, Student, PasswordReset } = require('../models/User')

const users = {}

users.findAdmins = (res, req) => {

    Admin.find({})
        .populate('user')
        .exec()
        .then(response => {

            if (response)
                res.status(200).json({ status: true, message: `Found Admin(s)`, user: response })
            else
                res.json({ status: false, message: 'Not found', user: response })
        })
        .catch(err => res.json({ status: false, err }))
}

users.findProfessors = (res, req) => {

    Professor.find({})
        .populate('user')
        .exec()
        .then(response => {

            if (response)
                res.status(200).json({ status: true, message: `Found Professor(s)`, user: response })
            else
                res.json({ status: false, message: 'Not found', user: response })
        })
        .catch(err => res.json({ status: false, err }))
}

users.findLibrarians = (res, req) => {

    Librarian.find({})
        .populate('user')
        .exec()
        .then(response => {

            if (response)
                res.status(200).json({ status: true, message: `Found Librarian(s)`, user: response })
            else
                res.json({ status: false, message: 'Not found', user: response })
        })
        .catch(err => res.json({ status: false, err }))
}

users.findStudents = (res, req) => {

    Student.find({})
        .populate('user')
        .exec()
        .then(response => {

            if (response)
                res.status(200).json({ status: true, message: `Found Student(s)`, user: response })
            else
                res.json({ status: false, message: 'Not found', user: response })
        })
        .catch(err => res.json({ status: false, err }))
}

module.exports = users