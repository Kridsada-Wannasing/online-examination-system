const express = require("express");
const router = express.Router();

const scoreControllers = require("../controllers/Score");
const calculateScore = require("../controllers/CalculateScore");

router.post("/", scoreControllers.createScore);
router.get("/", scoreControllers.getAllScore);
router.get("/student", scoreControllers.getScoresForStudent);
router.patch("/:examLogId/:scoreId", scoreControllers.updateScore);
router.delete("/:scoreId", scoreControllers.deleteScore);

module.exports = router;
