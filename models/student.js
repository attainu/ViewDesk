require("../app")
const sequelize = require("../db");
const Sequelize= require("sequelize");
const User = require("./user")
const Professor = require("./professor")
const Book = require("./book")
const{hash} = require("bcrypt")

const studentSchema = {

    // classTeacher: {
    //     type: Sequelize.INTEGER,
    //     allowNull: true,
    //         references: {
    //         model: Professor,
    //         key: 'userId'
    //     }

    // },
    // issuedBooks: {
    //    type: Sequelize.ARRAY(Sequelize.TEXT), //connect it to booksid or issued for
    //     allowNull:true,
    //     references: {
    //         model: Book,
    //         key: 'issuedFor'
    //     }

    // }

}



const Student = sequelize.define('student', studentSchema);
Student.sync()
Student.belongsTo(Professor)



// Student.beforeCreate(async user => {
//     try{
//     const hashedPassword = await hash(user.password, 10);
//     user.password = hashedPassword;
//   }
//   catch(err){
//       console.log(err)
//   }
// });

module.exports = Student;