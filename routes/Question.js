const express = require("express");
const router = express.Router();

const Upload = require("../utils/Upload");

const questionControllers = require("../controllers/Question");
const imageControllers = require("../controllers/Image");

router.get("/", questionControllers.getAllQuestion);
router.get("/:questionId", questionControllers.getQuestion);
router.post(
  "/",
  Upload.single("file"),
  questionControllers.createQuestion,
  imageControllers.uploadImage
);
router.patch("/:questionId", questionControllers.updateQuestion);
router.delete("/:questionId", questionControllers.deleteQuestion);

module.exports = router;
