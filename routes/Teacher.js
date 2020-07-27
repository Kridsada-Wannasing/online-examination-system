const express = require("express");
const router = express.Router();

const teacherController = require("../controllers/Teacher");

router.post("/register-one", teacherController.registerOne);
router.post("/register-many", teacherController.registerMany);
router.post("/login", teacherController.login);

module.exports = router;
