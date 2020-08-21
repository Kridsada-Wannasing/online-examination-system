const express = require("express");
const router = express.Router();
const passport = require("passport");

const teacherController = require("../controllers/Teacher");
const examNestedRoute = require("./Exam");

const auth = passport.authenticate("teacher-jwt", { session: false });

router.post("/login", teacherController.login);

router.use(auth);
router.post("/register-one", teacherController.registerOne);
router.post("/register-many", teacherController.registerMany);
router.get("/me", teacherController.getMe);

router.use("/exam", examNestedRoute);

module.exports = router;
