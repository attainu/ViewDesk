const sequelize = require("../db");
const Sequelize = require("sequelize");
const Student = require("./student")


const bookSchema = {
    name:
    {
        type: Sequelize.STRING,
        allowNull: false
    },
    subject:
        {type: Sequelize.STRING,
        allowNull: false},
    isIssued: {
        type: Sequelize.BOOLEAN,
        allowNull: false    //if book issued then studen yes(how to do it)
    },
    // issued_for:{
    //     type: Sequelize.INTEGER, //
    //     allowNull : false,
    //         references: {
    //         model: Student,
    //         key: 'id'
    //      }
    // }
    
}



const Book = sequelize.define('book', bookSchema);



// Book.belongsTo(student,{as:"student_id"})



Book.sync()

module.exports = Book