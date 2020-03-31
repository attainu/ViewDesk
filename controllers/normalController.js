require("../app")
const jwt = require("jsonwebtoken")
const User = require("../models/user")
const Eventt = require("../models/event")
const Student = require("../models/student")
const Professor = require("../models/professor")
const Marksheet = require("../models/marksheet")
const {compareSync} = require("bcrypt")
const Book = require("../models/book") 


const view_marksheet = async(req,res) => {
    let Id = req.params.studentId;
     if(Id == null) return res.status(400).send("Bad request")
    try{
      let marksheet = await Marksheet.findAll({
          include:{
          model : Student,
            where: 
                { student_id : Id}
            }
        })
        if(marksheet.length==0) return res.send(404).send("User not found")
        res.json({
            name : marksheet[0].student_name,
            Roll_no : marksheet[0].studentId,
            Email : marksheet[0].email,
            Totalmarks : marksheet[0].marks,
            MarksInPhysics : marksheet[0].physics,
            MarksInChemistry : marksheet[0].Chemistry,
            MarksInMathematics : marksheet[0].maths,

        })
    }
    catch (err) {
        console.log(err);
        if(err.name === "SequelizeValidationError")
          return res.status(400).send(`Validation Error: ${err.message}`);
      }
}


module.exports = {view_marksheet}


