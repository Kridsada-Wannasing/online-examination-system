const express = require("express");
const router = express.Router();
const passport = require("passport");

const teacherController = require("../controllers/Teacher");

const auth = passport.authenticate("teacher-jwt", { session: false });

router.post("/register-one", teacherController.registerOne);
router.post("/register-many", teacherController.registerMany);
router.post("/login", teacherController.login);
router.get("/me", auth, teacherController.getMe);

module.exports = router;
