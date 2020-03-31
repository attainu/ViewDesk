require("../app")
const sequelize = require("../db");
const { Sequelize, Model } = require("sequelize");
const{hash} = require("bcrypt")
const Student = require("./student")
const Professor =  require("./professor")
const Librarian = require("./librarian")
const Book = require("./book")
const sendMailToUser = require("../utlis/emailSending")
const {sign} = require("jsonwebtoken")





// class User extends Model {
//     static async findByEmailAndPassword(email, password) {
//       try {
//         const user = await User.findOne({
//           where: {
//             email
//           }
//         });
//         if (!User) throw new Error("Incorrect credentials");
//         const isMatched = await compare(password, User.password);
//         if (!isMatched) throw new Error("Incorrect credentials");
//         return User;
//       } catch (err) {
//         throw err;
//       }
//     }
//   }
class User extends Model {
    async generateToken() {
    
        const secretKey = `${this.getDataValue("email")}-${new Date(
            this.getDataValue("createdAt")
        ).getTime()}`;
        const token = await sign({ id: this.getDataValue("id") }, secretKey, {
            expiresIn: (1000 * 60 * 10).toString()
        });
        console.log(token)
        this.setDataValue("resetToken", token);
        await this.save();
        await sendMailToUser(this.getDataValue("email"), token);
    } // This is a method for grnerate token and change token value to generated token
}

const userSchema =  {
    name:
    {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    
    role: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    resetToken: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: ""
      },
    // studentId: {
    //     type: Sequelize.INTEGER,
    //     allowNull: true,
    //     references:{
    //         model: Student,
    //         key: 'userId'
    //     }
        
    // },
    // professorId: {
    //     type: Sequelize.INTEGER,
    //     allowNull: true,
      
    // },

    
    // created_at: {
    //     type: 'TIMESTAMP',
    //     defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    //     allowNull: true
    //   },
    //   updated_at: {
    //     type: 'TIMESTAMP',
    //     defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    //     allowNull: true
    //   }
      
    }


// const User = sequelize.define('user', userSchema);

// User.belongsTo(Student,{as:"student_id"})              //if search by name required // DOUBT!!!
// User.belongsTo(Professor,{as:"professor_id"})   


User.init(userSchema, {
    sequelize,
    modelName: "user"
  });
Student.belongsTo(User)
Professor.belongsTo(User)
Book.belongsTo(User)
Librarian.belongsTo(User)

// User.sync({force:true})

User.beforeCreate(async user => {
    try{
    const hashedPassword = await hash(user.password, 10);
    user.password = hashedPassword;
  }
  catch(err){
      console.log(err)
  }
});

User.beforeUpdate(async user => {
    try{
        if (user.changed("password")){
            const hashedPassword = await hash(user.password, 10);       //ismodified needed
        user.password = hashedPassword;  
        }
                       
  }
  catch(err){
      console.log(err)
  }
});

module.exports = User;