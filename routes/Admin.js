const express = require("express");
const passport = require("passport");
const router = express.Router();

const auth = passport.authenticate("admin-jwt", { session: false });

const teacherControllers = require("../controllers/Teacher");
const studentControllers = require("../controllers/Student");
const adminControllers = require("../controllers/Admin");

router.post("/login", adminControllers.login);

router.use(auth);
router.get("/all-student", studentControllers.getAllStudents);
router.get("/all-teacher", teacherControllers.getAllTeachers);

// router.get("/student/:studentId", studentControllers.get);
// router.get("/teacher/:teacherId", teacherControllers.getTeacher);

router.post("/student", studentControllers.registerMany);
router.post("/teacher", teacherControllers.registerMany);

router.patch("/:adminId", adminControllers.updateMe);

router.delete("/student/:studentId", studentControllers.deleteStudent);
router.delete("/teacher/:teacherId", teacherControllers.deleteTeacher);

module.exports = router;
