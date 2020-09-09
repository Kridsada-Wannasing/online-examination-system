const express = require("express");
const router = express.Router();
const passport = require("passport");

const studentControllers = require("../controllers/Student");

const examLogNestedRoutes = require("../routes/ExamLog");
const scoreNestedRoutes = require("../routes/Score");
const questionNestedRoutes = require("../routes/Question");
const examNestedRoutes = require("../routes/Exam");
const answerNestedRoutes = require("../routes/Answer");
const examinationNestedRoutes = require("../routes/Examination");

const auth = passport.authenticate("student-jwt", { session: false });

router.post("/login", studentControllers.login);
router.post("/forgotPassword", studentControllers.forgotPassword);

router.use(auth);

router.get("/me", studentControllers.getMe);
router.patch("/updateMe", studentControllers.updateMe);
router.patch("/updatePassword", studentControllers.updatePassword);

router.use("/exam-log", examLogNestedRoutes);
router.use("/score", scoreNestedRoutes);
router.use("/question", questionNestedRoutes);
router.use("/exam", examNestedRoutes);
router.use("/answer", answerNestedRoutes);
router.use("/examination", examinationNestedRoutes);

module.exports = router;
