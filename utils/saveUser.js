/** required modules */
require('../models/DB')
const { Admin, Professor, Librarian, Student } = require('../models/User')

let saveUser = (res, docs) => {

    const { _id: id, role } = docs

    if (role === 'ADMIN') {

        // Adding new Admin
        let newAdmin = new Admin({ user: id })
        newAdmin.save()
            .then(info => {

                if (info)
                    res.status(200).json({ status: true, message: 'Registration Successfull' })
                else
                    res.json({ status: false, message: 'Registration Failed' })
            })
            .catch(err => res.json({ status: false, message: 'Registration Failed', err }))
    }

    else if (role === 'PROFESSOR') {

        // Adding new Professor
        let newProfessor = new Professor({ user: id })
        newProfessor.save()
            .then(info => {

                if (info)
                    res.status(200).json({ status: true, message: 'Registration Successfull' })
                else
                    res.json({ status: false, message: 'Registration Failed' })
            })
            .catch(err => res.json({ status: false, message: 'Registration Failed', err }))

    }

    else if (role === 'LIBRARIAN') {

        // Adding new Librarian
        let newLibrarian = new Librarian({ user: id })
        newLibrarian.save()
            .then(info => {

                if (info)
                    res.status(200).json({ status: true, message: 'Registration Successfull' })
                else
                    res.json({ status: false, message: 'Registration Failed' })
            })
            .catch(err => res.json({ status: false, message: 'Registration Failed', err }))

    }

    else if (role === 'STUDENT') {

        // Adding new Student
        let newLibrarian = new Student({ user: id })
        newLibrarian.save()
            .then(info => {

                if (info)
                    res.status(200).json({ status: true, message: 'Registration Successfull' })
                else
                    res.json({ status: false, message: 'Registration Failed' })
            })
            .catch(err => res.json({ status: false, message: 'Registration Failed', err }))

    }
}


module.exports = saveUser