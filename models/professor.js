require("../app")
const sequelize = require("../db");
const Sequelize = require("sequelize");
const{hash} = require("bcrypt")
const User = require("./user")

const professorSchema = {
  
    // userId:{
    //     type: Sequelize.INTEGER,    //how to connect this to user student id
    //     allowNull: true, 
    //     references:{
    //         model: User,
    //         key: 'id'
    //     }               
    // },

}


const Professor = sequelize.define('professor', professorSchema);
Professor.sync()

// Admin.init(adminSchema, {
//     sequelize,
//     tableName: "admin"
//   });



module.exports = Professor;