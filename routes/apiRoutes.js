require("../app")
let { Router } = require("express")
let router = Router()

const User = require("../models/user")
let {User_login,
    eventt_created,books_added,marksheet_added,books_issued,PasswordRecoveryEmailSent,ResetPassword,
password_changed,User_added,student_added, get_student, professor_added,librarian_added} = require("../controllers/apiController")

const {authenticateToken,admin_only,admin_professor,
    admin_librarian,admin_student,} = require("../middleware/authentication")

router.get("/", (req,res) => res.send("hello"))
router.post("/", User_login)
router.post("/addstudent",authenticateToken,admin_professor, student_added);  //authenticateToken,
router.post("/addProfessor",authenticateToken,admin_only,professor_added);
router.post("/addlibrarian",authenticateToken,admin_only, librarian_added);
router.post("/createEvent",authenticateToken,admin_only, eventt_created);
// router.post("/addmarksheet",authenticateToken,admin_professor, marksheet_added)
router.post("/addbooks",authenticateToken,admin_librarian,books_added);
router.post("/issuebooks",authenticateToken,admin_librarian,books_issued)
router.post("/forgotpassword", PasswordRecoveryEmailSent);
router.post("/reset/:resetToken", ResetPassword);
router.post("/changepassword", authenticateToken,admin_student,password_changed);
router.post("/registeradmin",User_added);
router.get("/student/:id",get_student)


// router.get("/issuedBooks",/*auth */view_booksData)








module.exports = router;
