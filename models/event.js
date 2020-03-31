require("../app")
const sequelize = require("../db");
const Sequelize = require("sequelize")

const eventSchema = {
    name:{
        type: Sequelize.STRING,
        allowNull: null,
    },
    description:{
        type:Sequelize.STRING,
        allowNull: null
    },
    createdAt: {
        type: Sequelize.DATE, defaultValue: Sequelize.NOW 
    }
}
//add isadmin

const Eventt = sequelize.define('eventt', eventSchema);
Eventt.sync()
module.exports = Eventt;