const db = require("../models");

const createExam = async (req, res, next) => {
  const newExam = await db.Exam.create(req.body);

  res.status(201).json({
    status: "success",
    message: "สร้างชุดข้อสอบสำเร็จ",
    newExam,
  });
};

const updateExam = async (req, res, next) => {
  await db.Exam.update(req.body, {
    where: { examId: req.params.examId },
  })
    .then((updatedExam) =>
      res.status(200).json({
        status: "succes",
        message: "เปลี่ยนแปลงข้อมูลชุดข้อสอบนี้สำเร็จ",
        updatedExam,
      })
    )
    .catch((err) => {
      res.status(400).json({
        status: "fail",
        message: err,
      });
    });
};

module.exports = {
  createExam,
  updateExam,
};
