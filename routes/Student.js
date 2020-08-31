const express = require("express");
const router = express.Router();
const passport = require("passport");

const studentControllers = require("../controllers/Student");

const auth = passport.authenticate("student-jwt", { session: false });

router.post("/login", studentControllers.login);

router.use(auth);

router.get("/me", auth, studentControllers.getMe);

module.exports = router;
