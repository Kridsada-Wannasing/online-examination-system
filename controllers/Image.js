const db = require("../models");
const fs = require("fs");

const uploadImage = async (req, res, next) => {
  const newQuestion = req.newQuestion;
  try {
    if (req.file == undefined) {
      res.status(404).json({
        status: "fail",
        message: "ไม่พบไฟล์รูปภาพ",
      });
    }

    const image = await db.Image.create({
      questionId: newQuestion.questionId,
      type: req.file.mimetype,
      name: req.file.originalname,
      path: `public/img/uploads/${req.file.filename}`,
    });

    newQuestion.image = image;

    res.status(201).json({
      status: "success",
      message: "สร้างคำถามสำเร็จ",
      newQuestion,
      image,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};

module.exports = {
  uploadImage,
};
