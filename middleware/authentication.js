require("../app")
const jwt = require("jsonwebtoken")

const authenticateToken = async (req, res, next) => {
    // console.log(req.headers.authorization)
    let authHeader = await req.headers['authorization']
    
    let token = authHeader.replace('Bearer ','')
    // console.log(token)
    if(token == null) return res.sendStatus(401) //not have token
     jwt.verify(token, "qwerty123",
        (err) => {
            // console.log('i m here')
            if (err) return res.sendStatus(403) //have token but not valid
            return next() }
           )
}

const admin_only = async(req,res,next) =>
      {
          try{
    let authHeader = await req.headers['authorization'];
    let token = authHeader.split(' ')[1];
    let user = jwt.decode(token,"qwerty123");
    
        if (!user) {
        throw Error("User not found");
          }
        if(user.role=="student" || user.role =="professor" || user.role =="librarian"){
            throw Error("Sorry! you are not allowed")
        }
        if(user.role=="admin"){
            next()
        }
        else{ return res.status(401).send("Incorrect credentials");
        }
    } 
    catch(err){console.log(err)}
  }

  const admin_professor = async(req,res,next) =>
      {try{
        //   console.log(req.headers)
    let authHeader = await req.headers['authorization'];
    // console.log(`authhdr${authHeader}`)
    let token = authHeader.split(' ')[1];
    console.log(token)
    let user =await jwt.verify(token, "qwerty123");
    // console.log(user)
        if (!user) {
        throw Error("User not found");
          }
        if(user.role=="student" || user.role =="librarian"){
            throw Error("Student not allowed")
        }
        if(user.role=="admin" || user.role =="professor"){
            next()
        }
        else{ return res.status(401).send("Incorrect credentials");
        }
        } 
        catch(err){
            console.log(err)
            res.status(401).send(err.message)}
  }

  const admin_librarian = async(req,res,next) =>
      { try{
    let authHeader = await req.headers['authorization'];
    let token = authHeader.split(' ')[1];
    let user = jwt.decode(token);
        if (!user) {
        throw Error("User not found");
          }
        if(user.role=="student" || user.role=="professor"){
            throw Error("Student not allowed")
        }
        if(user.role=="admin" || user.role=="librarian"){
            next()
        }
        else{ return res.status(401).send("Incorrect credentials");
        }
    }
    catch(err){console.log(err)}
  }

  const admin_student = async(req,res,next) =>
      {
        try {
    let authHeader = await req.headers['authorization'];
    let token = authHeader.split(' ')[1];
    let user = jwt.decode(token);
        if (!user) {
        throw Error("User not found");
          }
        if(user.role=="librarian" || user.role=="professor"){
            throw Error("Student not allowed")
        }
        if(user.role=="admin" || user.role=="student"){
            next()
        }
        else{ return res.status(401).send("Incorrect credentials");
        }
  }
  catch(err){console.log(err)}
}

module.exports = {authenticateToken,
        admin_only,
    admin_professor,
    admin_librarian,
    admin_professor,
admin_student
}
