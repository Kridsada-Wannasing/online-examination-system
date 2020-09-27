const express = require("express");
const router = express.Router();
const passport = require("passport");

const teacherControllers = require("../controllers/Teacher");
const studentControllers = require("../controllers/Student");

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
const imageNestedRoutes = require("./Image");
const registrationNestedRoutes = require("../routes/Registration");

const auth = passport.authenticate("teacher-jwt", { session: false });

router.post("/login", teacherControllers.login);
router.post("/forgot-password", teacherControllers.forgotPassword);

router.use(auth);

router.get("/student", studentControllers.getAllStudents);

router.post("/student/register", studentControllers.registerMany);

router.patch("/me", teacherControllers.updateMe);
router.patch("/password", teacherControllers.updatePassword);

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
router.use("/image", imageNestedRoutes);
router.use("/registration", registrationNestedRoutes);

module.exports = router;
