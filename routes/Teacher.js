const express = require("express");
const router = express.Router();
const passport = require("passport");

const teacherController = require("../controllers/Teacher");

const examNestedRoutes = require("./Exam");
const questionNestedRoutes = require("./Question");
const tagNestedRoutes = require("./Tag");
const subjectNestedRoutes = require("./Subject");
const meetingNestedRoutes = require("./Subject");

const auth = passport.authenticate("teacher-jwt", { session: false });

router.post("/login", teacherController.login);

router.use(auth);
router.post("/register-one", teacherController.registerOne);
router.post("/register-many", teacherController.registerMany);
router.get("/me", teacherController.getMe);

router.use("/exam", examNestedRoutes);
router.use("/question", questionNestedRoutes);
router.use("/tag", tagNestedRoutes);
router.use("/subject", subjectNestedRoutes);
router.use("/meeting", meetingNestedRoutes);

module.exports = router;
