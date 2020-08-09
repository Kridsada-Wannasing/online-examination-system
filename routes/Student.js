const express = require("express");
const router = express.Router();
const passport = require("passport");

const studentController = require("../controllers/Student");

const auth = passport.authenticate("student-jwt", { session: false });

router.post("/login", studentController.login);
router.get("/me", studentController.getMe);

module.exports = router;
