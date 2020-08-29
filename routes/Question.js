const express = require("express");
const router = express.Router();

const Upload = require("../utils/Upload");

const questionControllers = require("../controllers/Question");

router.get("/", questionControllers.getAllQuestion);
router.get("/:questionId", questionControllers.getQuestion);
router.post(
  "/",
  Upload.single("image"),
  questionControllers.createQuestion,
  imageControllers.uploadImage
);
router.patch("/:questionId", questionControllers.updateQuestion);
router.delete("/:questionId", questionControllers.deleteQuestion);

module.exports = router;
