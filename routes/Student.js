const express = require("express");
const router = express.Router();
const passport = require("passport");

const studentControllers = require("../controllers/Student");

const examLogNestedRoutes = require("../routes/ExamLog");
const scoreNestedRoutes = require("../routes/Score");
const questionNestedRoutes = require("../routes/Question");
const questionExamNestedRoutes = require("../routes/QuestionExam");
const examNestedRoutes = require("../routes/Exam");
const answerNestedRoutes = require("../routes/Answer");
const meetingNestedRoutes = require("../routes/Meeting");
const examinationNestedRoutes = require("../routes/Examination");
const notificationNestedRoutes = require("../routes/Notification");

const auth = passport.authenticate("student-jwt", { session: false });

router.post("/login", studentControllers.login);
router.post("/forgot-password", studentControllers.forgotPassword);

router.use(auth);

router.patch("/me", studentControllers.updateMe);
router.patch("/password", studentControllers.updatePassword);

router.use("/exam-log", examLogNestedRoutes);
router.use("/score", scoreNestedRoutes);
router.use("/question", questionNestedRoutes);
router.use("/exam", examNestedRoutes);
router.use("/answer", answerNestedRoutes);
router.use("/meeting", meetingNestedRoutes);
router.use("/question-exam", questionExamNestedRoutes);
router.use("/notification", notificationNestedRoutes);
router.use("/examination", examinationNestedRoutes);

module.exports = router;
