require("../app")
const {sign,verify} = require("jsonwebtoken")
const User = require("../models/user")
const dotenv = require("dotenv");
dotenv.config();
const Eventt = require("../models/event")
const Student = require("../models/student")
const Professor = require("../models/professor")
const Librarian = require("../models/librarian")
const Marks = require("../models/marksheet")
const Book = require("../models/book")
const { compareSync } = require("bcrypt")
// const { IssuedBook, Book } = require("../models/book")



let User_login = async (req, res,next) => {
  let { email, password } = req.body;
  let user = await User.findOne({    
    where:{email}
    
  });
  console.log(user.password)
  if (!user) {
    return res.status(400).send("User not found");
  }
  if (compareSync(password, user.password)) {
    console.log("heree")
    let token = await sign({ role: user.role, name: user.name, email: user.email },
        /*process.env.JWT_SECRET_KEY,*/"qwerty123",
      {
        expiresIn: "24h"
      });

    res.json({
      token,
      message: "token sent successfully"
    });
  } else {
    res.status(401).json({
      message: "Unauthenticated"
    });
  }
}


// const student_added = async (req, res) => {
//   try {
//     await User.create({ ...req.body });
//     res.send("Student  added successfully")
//   }
//   catch (err) {
//     console.log(err);
//     if (err.name === "SequelizeValidationError")
//       return res.status(400).send(`Validation Error: ${err.message}`);
//   }

// };
// const librarian_added = async (req, res) => {
//   try {
//     await User.create({ ...req.body });
//     res.send("Librarian added successfully")
//   }
//   catch (err) {
//     console.log(err)
//     if (err.name === "SequelizeValidationError")
//       return res.status(400).send(`Validation Error: ${err.message}`);
//   }
// }
// const professor_added = async (req, res) => {
//   try {
//     await User.create({ ...req.body });
//     res.send("Professor added successfully")
//   }
//   catch (err) {
//     console.log(err);
//     if (err.name === "SequelizeValidationError")
//       return res.status(400).send(`Validation Error: ${err.message}`);
//   }
// }

const eventt_created = async (req, res) => {
  try {
    await Eventt.create({ ...req.body });
    res.send("Event successfully created")
  }
  catch (err) {
    console.log(err);
    if (err.name === "SequelizeValidationError")
      return res.status(400).send(`Validation Error: ${err.message}`);
  }
};

const books_added = async (req, res) => {
  try {
    await Book.create({ ...req.body });
    res.send("Book addded successfully")
  }
  catch (err) {
    console.log(err);
    if (err.name === "SequelizeValidationError")
      return res.status(400).send(`Validation Error: ${err.message}`);
  }
};

const books_issued = async (req, res) => {
  try {
    await IssuedBook.create({ ...req.body });
    res.send("Book addded successfully")
  }
  catch (err) {
    console.log(err);
    if (err.name === "SequelizeValidationError")
      return res.status(400).send(`Validation Error: ${err.message}`);
  }
};

const marksheet_added = async (req, res) => {
  try {
    await Marks.create({ ...req.body });
    res.send("Marksheet added succesfully")
  }
  catch (err) {
    console.log(err);
    if (err.name === "SequelizeValidationError")
      return res.status(400).send(`Validation Error: ${err.message}`);
  }
}

const ResetPassword = async (req, res) => {
  const { resetToken } = req.params;
  console.log(resetToken)
  try {
    let user = await User.findOne({ where:{ resetToken    }   // !User is should  be search for student and prof as well
                            //WHAT will User return ???
    });
    if (!user) return res.status(400).send("User not found");

    const secretKey = `${user.getDataValue("email")}-${new Date(
      user.getDataValue("createdAt")          //making secretkey
    ).getTime()}`;

    const payload = await verify(resetToken, secretKey);      //verifying token
    console.log(payload)
    if (payload) {

      const { password, email } = req.body;
      try {
        await user.update(
          { password, resetToken: "" },       //reset token again to null
          { where: { email }, individualHooks: true } //you can change password in renderreset password this not needed
        );
        return res.json({ Success: "Please log-in again with your new password" });
      }
      catch (err) {
        console.log(err);
        res.status(500).send(err.message);
      }
    }
  }
  catch (err) {
    console.log(err);
    if (err.name === "TokenExpiredError") {
      return res.json({ Err: "Please get a new reset password email" });
    }
    res.status(500).send("Server Error");
  }
}


async function PasswordRecoveryEmailSent(req, res) {
  let { email } = req.body;
  if (!email) return res.status(400).send("Email is required!")
  try {
    let user = await User.findOne({ where:
        {email}   // !User is should  be search for student and prof as well
      
    });
    if (!user) return res.status(400).send("User not found!");
   await user.generateToken();
  
    res.json({Success:"Email sent successfully. Check your inbox"});
  }
  catch (err) {
    console.log(err);
    res.status(500).send(err.message);
  }

}

const password_changed = async (req, res) => {
  const { email, oldpassword, newpassword } = req.body;
  if (!email || !oldpassword || !newpassword)
    return res.status(400).send("Bad request");
  try {
    const user = await User.findOne({  where:{email}   //changed Student to User
        
    });
    if (!user) return res.status(401).send("Incorrect credentials");
    const isMatched = await compareSync(oldpassword, user.password);

    if (!isMatched) return res.status(401).send("Incorrect credentials");
    console.log("heyy")
     await user.update({password:newpassword})

    return res.json({ Success: "Your Password has been changed" })
  }
  catch (err) {
    console.log(err.message);
    res.send(err.message);
  }
}


const User_added = async(req,res) => {
  try {
    
    await User.create({ ...req.body });
    res.send("User added successfully")
  }
  catch (err) {
    console.log(err);
    if (err.name === "SequelizeValidationError")
      return res.status(400).send(`Validation Error: ${err.message}`);
  }

};

const student_added = async(req,res) => {
  try {
    console.log(req.body)
    
    const user = await User.create({ ...req.body });
    console.log(user.toJSON())
   const student = await Student.create({userId : user.id})
  
    res.send(`Student added successfully`)
  }
  catch (err) {
    console.log(err);
    if (err.name === "SequelizeValidationError")
      return res.status(400).send(`Validation Error: ${err.message}`);
  }

};

const professor_added = async(req,res) => {
  try {
    console.log(req.body)
    
    const user = await User.create({ ...req.body });
    console.log(user.toJSON())
   const professor = await Professor.create({userId : user.id})
  
    res.send(`Professor added successfully`)
  }
  catch (err) {
    console.log(err);
    if (err.name === "SequelizeValidationError")
      return res.status(400).send(`Validation Error: ${err.message}`);
  }

};

const librarian_added = async(req,res) => {
  try {
    console.log(req.body)
    
    const user = await User.create({ ...req.body });
    console.log(user.toJSON())
   const librarian = await Librarian.create({userId : user.id})
  
    res.send(`Librarian added successfully`)
  }
  catch (err) {
    console.log(err);
    if (err.name === "SequelizeValidationError")
      return res.status(400).send(`Validation Error: ${err.message}`);
  }

};


const get_student = async(req, res) => {
  const{id} = req.params;
  // console.log()
  const student = await Student.findOne({where: {id}, include:User})
  console.log(student)
  res.send(student)
}


module.exports = {
  User_login,
  student_added,
  professor_added,
  librarian_added,
  eventt_created,
  books_added,
  marksheet_added,
  books_issued,
  ResetPassword,
  PasswordRecoveryEmailSent,
  password_changed,
  User_added,
  get_student
}