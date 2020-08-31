const express = require("express");
const router = express.Router();
const passport = require("passport");

const teacherControllers = require("../controllers/Teacher");

const auth = passport.authenticate("teacher-jwt", { session: false });

router.post("/register-one", teacherControllers.registerOne);
router.post("/register-many", teacherControllers.registerMany);
router.post("/login", teacherControllers.login);
router.get("/me", auth, teacherControllers.getMe);

module.exports = router;
