const sequelize = require("../db");
const Sequelize = require("sequelize")
const User = require("./user")


const forumSchema =  {
    title:{
        type: Sequelize.STRING,
        allowNull: false
    },
    body:{
        type: Sequelize.STRING,
        allowNull: false
    },
    comment:{
        type: Sequelize.ARRAY,
        allowNull: false //this will be fk and array
    },
    // userName:{
    //     type: Sequelize.STRING,
    //     allowNull: false,
    //     references: {
    //         model: User,
    //         key: 'id'
    //     }
    // }
}

const Forum = sequelize.define('forum', forumSchema);
// Forum.belongsTo(student,{as:"student_id"})
Forum.sync()
module.exports = Forum;