const express = require("express");
const router = express.Router();

const tagControllers = require("../controllers/Tag");

router.post("/", tagControllers.createTag);
router.get("/", tagControllers.getAllTag);
router.get("/:tagId", tagControllers.getTag);
router.patch("/:tagId", tagControllers.updateTag);
router.delete("/:tagId", tagControllers.deleteTag);

module.exports = router;
