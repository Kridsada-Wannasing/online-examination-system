const express = require("express");
const router = express.Router();

const scoreControllers = require("../controllers/Score");
const calculateScore = require("../controllers/CalculateScore");

router.post("/", calculateScore, scoreControllers.createScore);
router.get("/", scoreControllers.getAllScore);
router.get("/:scoreId", scoreControllers.getScore);
router.patch("/:scoreId", scoreControllers.updateScore);
router.delete("/:scoreId", scoreControllers.deleteScore);

module.exports = router;
