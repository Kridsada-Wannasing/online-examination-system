const express = require("express");
const router = express.Router();
const passport = require("passport");

const teacherControllers = require("../controllers/Teacher");

const examNestedRoutes = require("./Exam");
const questionNestedRoutes = require("./Question");
const tagNestedRoutes = require("./Tag");
const subjectNestedRoutes = require("./Subject");
const meetingNestedRoutes = require("./Subject");

const auth = passport.authenticate("teacher-jwt", { session: false });

router.post("/login", teacherControllers.login);

router.use(auth);
router.post("/register-one", teacherControllers.registerOne);
router.post("/register-many", teacherControllers.registerMany);
router.get("/me", teacherControllers.getMe);

router.use("/exam", examNestedRoutes);
router.use("/question", questionNestedRoutes);
router.use("/tag", tagNestedRoutes);
router.use("/subject", subjectNestedRoutes);
router.use("/meeting", meetingNestedRoutes);

module.exports = router;
