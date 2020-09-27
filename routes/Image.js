const router = require("express").Router();

const Upload = require("../utils/Upload");
const imageControllers = require("../controllers/Image");

router.get("/", imageControllers.getAllImages);
router.get("/:questionId", imageControllers.getImage);
router.post("/", Upload.single("file"), imageControllers.uploadImage);
router.patch(
  "/:questionId",
  Upload.single("file"),
  imageControllers.changeImage
);
router.delete("/:questionId", imageControllers.deleteImage);

module.exports = router;
