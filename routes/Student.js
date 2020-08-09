const express = require("express");
const router = express.Router();

const studentController = require("../controllers/Student");

router.post("/login", studentController.login);
router.get("/me", studentController.getMe);

module.exports = router;
