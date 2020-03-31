require("../app")
const sequelize = require("../db");
const Sequelize = require("sequelize");
const{hash} = require("bcrypt")
const User = require("./user")

const librarianSchema = {
  
    // userId:{
    //     type: Sequelize.INTEGER,    //how to connect this to user student id
    //     allowNull: true, 
    //     references:{
    //         model: User,
    //         key: 'id'
    //     }               
    // },
   
    isAdmin: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    }

}


const Librarian= sequelize.define('librarian', librarianSchema);
Librarian.sync()

// Admin.init(adminSchema, {
//     sequelize,
//     tableName: "admin"
//   });



module.exports = Librarian;