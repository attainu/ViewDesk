const Sequelize = require("sequelize");
// const sequelize = new Sequelize('postgres://thcbpxzm:mHyr579v-TFC8Ovn4ZKN7mj4aL9CxWWN@john.db.elephantsql.com:5432/thcbpxzm'
//   )
const sequelize = new Sequelize('ams', 'postgres', '1234', {
  host: 'localhost',
  dialect: 'postgres',
  logging:false
});


sequelize.sync() //{force:true}

sequelize
  .authenticate()
  .then(() => console.log("Connection success!"))
  .catch(err => console.log(`Error: ${err.message}`));

module.exports = sequelize;
