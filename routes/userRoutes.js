let { Router } = require("express")
let router = Router()

const {view_marksheet} = require("../controllers/normalController")

const {authenticateToken,admin_only,admin_professor,
    admin_librarian,admin_student,} = require("../middleware/authentication")



// router.get("/viewMarksheet/:studentId",authenticateToken,admin_student,view_marksheet);





module.exports = router;