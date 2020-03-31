const sequelize = require("../db");
const Sequelize = require("sequelize")
const Student = require("./student")

const marksheetSchema = { 

    //  student_id:{
    //      type: Sequelize.INTEGER,
    //      allowNull: false,
    //      references:
    //      {
    //          model: Student,
    //          key : 'id'
    //      }
    //  },

    physics:{
        type: Sequelize.INTEGER,
        allowNull:false
    },
    chemistry:{
        type: Sequelize.INTEGER,
        allowNull:false
    },
    maths:{
        type: Sequelize.INTEGER,
        allowNull:false
    },
    TotalMarks:{
        type: Sequelize.INTEGER,
        allowNull:false
    },
    TotalPercentage:{
        type: Sequelize.INTEGER,
        allowNull:false
    },

}

const Marksheet = sequelize.define('marksheet', marksheetSchema);


 Marksheet.sync()
module.exports = Marksheet;