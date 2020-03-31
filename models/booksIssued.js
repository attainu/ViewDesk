const sequelize = require("../db");
const Sequelize = require("sequelize");
const student = require("./student")




// const issuedBooks = {
//     id: {
//         type: Sequelize.CHAR,
//         allowNull: false,
//         unique: true,
//         primaryKey: true,
//         autoIncrement: true
//     },
//     book_id: {
//         type: Sequelize.INTEGER,
//         references:
//         {
//             model: bookSchema,
//             key: 'id'
//         }
//     },
//     // student_id: {
//     //     type: Sequelize.STRING,
//     //     references:
//     //     {
//     //         model: student,
//     //         key : 'rollNumber'
//     //     }
//     // }
// }

// const IssuedBook = sequelize.define('issued_book', issuedBooks);