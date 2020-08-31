const db = require("../models");
const fs = require("fs");

const uploadImage = async (req, res, next) => {
  try {
    if (req.file == undefined) {
      return res.status(404).json({
        status: "fail",
        message: "ไม่พบไฟล์รูปภาพ",
      });
    }

    const image = await db.Image.create({
      questionId: req.params.questionId,
      type: req.file.mimetype,
      name: req.file.originalname,
      data: fs.readFileSync("/public/img/uploads/" + req.file.filename),
    });
    const newImage = fs.writeFileSync(
      "/public/img/tmp/" + image.name,
      image.data
    );

    res.status(201).json({
      status: "success",
      message: "บันทึกรูปภาพสำเร็จ",
      newImage,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      newImage,
    });
  }
};

module.exports = {
  uploadImage,
};
