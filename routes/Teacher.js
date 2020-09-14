const express = require("express");
const router = express.Router();
const passport = require("passport");

const teacherControllers = require("../controllers/Teacher");

const examNestedRoutes = require("./Exam");
const questionNestedRoutes = require("./Question");
const answerNestedRoutes = require("./Answer");
const choiceNestedRoutes = require("./Choice");
const subjectNestedRoutes = require("./Subject");
const questionTagNestedRoutes = require("./QuestionTag");
const questionExamNestedRoutes = require("./QuestionExam");
const tagNestedRoutes = require("./Tag");
const meetingNestedRoutes = require("./Meeting");
const examinationNestedRoutes = require("./Examination");

const auth = passport.authenticate("teacher-jwt", { session: false });

router.post("/login", teacherControllers.login);

router.use(auth);

router.post("/register-one", teacherControllers.registerOne);
router.post("/register-many", teacherControllers.registerMany);

// router.get("/me", teacherControllers.getMe);
router.post("/updateMe", teacherControllers.updateMe);

router.use("/exam", examNestedRoutes);
router.use("/question", questionNestedRoutes);
router.use("/choice", choiceNestedRoutes);
router.use("/answer", answerNestedRoutes);
router.use("/subject", subjectNestedRoutes);
router.use("/tag", tagNestedRoutes);
router.use("/question-tag", questionTagNestedRoutes);
router.use("/question-exam", questionExamNestedRoutes);
router.use("/meeting", meetingNestedRoutes);
router.use("/examination", examinationNestedRoutes);

module.exports = router;
